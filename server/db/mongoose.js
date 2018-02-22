const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/search-img');

module.exports = { mongoose };