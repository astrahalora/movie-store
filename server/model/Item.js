const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const itemSchema = new Schema({
    Title: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Writer: String,
    Actors: String,
    Plot: String,
    Awards: String,
    Poster: String,
    imdbRating: String,
    Quantity: Number,
    Price: Number,
    createdAt: Date

});

const Item = model('Item', itemSchema);

module.exports = Item;