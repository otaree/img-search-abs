require('./config/config');

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
    if (offset < 1 && searchterm.trim() === '') {
        return res.status(400).send({
            error: 'Offset must be greater than 0 and search term must contain a character'
        });
    }

    const newSearch = new Search({
        term: searchterm
    });

    await newSearch.save();

    const images = await imageSearch(searchterm, offset);
    res.send(images);
});


app.get('/api/latest/imagesearch/', async (req, res) => {
    var images = await Search.find({}, 'when term -_id').limit(10);
    res.send(images);
});

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});


module.exports = { app };
