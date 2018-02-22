const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const { imageSearch } = require('./utils/google-img');
const { mongoose } = require('./db/mongoose');
const { Search } = require('./models/search');

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

app.get('/api/imagesearch/:searchterm', async (req, res) => {
    const searchterm = req.params.searchterm;
    const offset = req.query.offset;
    if (offset < 1) {
        return res.status(400).send({
            error: 'Offset must be greater than 0)'
        });
    }

    let search = await Search.findOne({ term: searchterm });

    if (!search) {
        const newSearch = new Search({
            term: searchterm
        });

        await newSearch.save();
    }

    const images = await imageSearch(searchterm, offset);
    res.send(images);
});

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

