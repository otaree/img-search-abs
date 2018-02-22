const GoogleImages = require('google-images');

const key = 'AIzaSyAuVztgg-hqO-V3aiVuMHA8ag47FXB_H2o';
const cseID = '017698998051357428308:lgojtdhciyo';

const client = new GoogleImages(cseID, key);

const tenBase = (num) => {
    while (num % 10 !== 0) {
        num++;
    }

    return num/10;
};


const parseImageResults = (images) => {
    let results = [];
    for (let i = 0; i < images.length; i++) {
        results.push({
            url: images[i].url,
            snippet: images[i].description,
            thumbnail: images[i].thumbnail.url,
            context: images[i].parentPage
        });
    }

    return results;

};

const imageSearch = async (searchTerm, offset) => {
    const page = tenBase(offset);
    const images = await client.search(searchTerm, { page: page});
    return parseImageResults(images);
};


module.exports = { imageSearch };