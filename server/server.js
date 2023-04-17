const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const express = require("express");

const { reader, writer } = require("./fileReader");
const filePath = path.join(`${__dirname}/movies.json`);

const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

// mongoose.connect(
//     "link"
//   );

let Movie = require("./model/Movie.js");
let Item = require("./model/Item.js");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.route("/api/movies").get(async (req, res) => {
  try {
    const response = await reader(filePath);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Data could not be found");
  }
});

app
  .route("/favorites")
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
        console.log(movie);
      })
      .catch((error) => {
        res.status(500).send(error);
        console.log(error.message);
      });
  });

app
  .route("/cart")
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
    } = req.body;
    const Quantity = 1;
    const Price = 14.99;
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
      const response = await Item.findOneAndUpdate(
        { Title: req.body.Title },
        { Quantity: req.body.Quantity, Price: req.body.Quantity * 14.99 }
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
        console.log(item);
      })
      .catch((error) => {
        res.status(400).json({ success: false });
        console.log(error.message);
      });
  });

app.listen(port, () => console.log(`http://127.0.0.1:${port}/api/movies`));
