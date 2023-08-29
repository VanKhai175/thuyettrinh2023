const mongoose = require('mongoose');

const book = mongoose.Schema({
    title: String,
    price: Number,
    image: String
});

module.exports = mongoose.model('book',book);