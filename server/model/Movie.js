const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const movieSchema = new Schema({
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
    createdAt: Date

});

const Movie = model('Movie', movieSchema);

module.exports = Movie;