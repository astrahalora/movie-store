const express = require("express");
const router = express.Router();

const Movie = require("../model/Movie");

router.route("/")
    .get(async (req, res) => {
        try {
            const response = await Movie.find();
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).send("Data could not be found");
        }
    })
    .post(async (req, res) => {
        const {
            Title,
            Released,
            Runtime,
            Genre,
            Director,
            Writer,
            Actors,
            Plot,
            Awards,
            Poster,
            imdbRating,
        } = req.body;

        const movie = new Movie({
            Title,
            Released,
            Runtime,
            Genre,
            Director,
            Writer,
            Actors,
            Plot,
            Awards,
            Poster,
            imdbRating,
        });
        movie
            .save()
            .then((movie) =>
                res.status(200).json({ success: true, message: `${movie.Title} added` })
            )
            .catch((err) => res.status(400).json({ success: false }));
    })
    .delete((req, res) => {
        const movieName = req.body.title;
        Movie.deleteOne({ Title: movieName })
            .then((movie) => {
                res.status(200).json({
                    success: true,
                    message: "Movie removed from favorites",
                });
            })
            .catch((error) => {
                res.status(500).send(error);
                console.log(error.message);
            });
    });

module.exports = router;