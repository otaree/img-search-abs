const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchSchema = new Schema({
    when: {
        type: Date,
        default: new Date().toISOString()
    },
    term: String
});


const Search = mongoose.model('Search', searchSchema);

module.exports = { Search };