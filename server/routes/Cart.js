const express = require("express");
const router = express.Router();

const Item = require("../model/Item");

router
    .route("/")
    .get(async (req, res) => {
        try {
            const response = await Item.find();
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
            Price
        } = req.body;
        const Quantity = 1;
        const createdAt = Date.now();

        const item = new Item({
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
            Quantity,
            Price,
            createdAt,
        });
        item
            .save()
            .then((item) =>
                res.status(200).json({ success: true, message: `${item.Title} added` })
            )
            .catch((err) => res.status(400).json({ success: false }));
    })
    .patch(async (req, res) => {
        try {
            await Item.findOneAndUpdate(
                { Title: req.body.Title },
                { Quantity: req.body.Quantity, Price: req.body.Price }
            );
            res
                .status(200)
                .json({ success: true, message: `${req.body.Title} has been updated` });
        } catch (error) {
            console.error(error);
            res.status(400).json({ success: false });
        }
    })
    .delete((req, res) => {
        const movieName = req.body.title;
        Item.deleteOne({ Title: movieName })
            .then((item) => {
                res
                    .status(200)
                    .json({ success: true, message: "Movie removed from cart" });
            })
            .catch((error) => {
                res.status(400).json({ success: false });
                console.log(error.message);
            });
    });

module.exports = router;