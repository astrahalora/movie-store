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
//   "link"
//   );

let Movie = require('./model/Movie.js');
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

app.route("/api/movies")
.get(async (req, res) => {
  try {
    const response = await reader(filePath);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Data could not be found");
  }
});

app.route("/favorites")
.get(async (req,res) => {
  try {
    const response = await Movie.find();
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Data could not be found");
  }
})
.post(async (req,res) => {
  const Title = req.body.Title;
  const Released = req.body.Released;
  const Runtime = req.body.Runtime;
  const Genre = req.body.Genre;
  const Director = req.body.Director;
  const Writer = req.body.Writer;
  const Actors = req.body.Actors;
  const Plot = req.body.Plot;
  const Awards = req.body.Awards;
  const Poster = req.body.Poster;
  const imdbRating = req.body.imdbRating;
  const createdAt = Date.now();
  const movie = new Movie ({
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
    createdAt
  });
  movie.save()
  .then(movie => res.status(200).send(`${movie.Title} added`))
  .catch(err => res.status(400).json({ success: false }));
})
.delete((req, res) => {
  const movieName = req.body.title;
  Movie.deleteOne({Title: movieName})
  .then(movie => {
    res.status(200).send('Movie removed from favorites');
    console.log(movie)
  })
  .catch((error => {
    res.status(500).send(error);
    console.log(error.message);
}))
})

app.route("/cart")
.get(async (req,res) => {
  try {
    const response = await Item.find();
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Data could not be found");
  }
})
.post(async (req,res) => {
  const Title = req.body.Title;
  const Released = req.body.Released;
  const Runtime = req.body.Runtime;
  const Genre = req.body.Genre;
  const Director = req.body.Director;
  const Writer = req.body.Writer;
  const Actors = req.body.Actors;
  const Plot = req.body.Plot;
  const Awards = req.body.Awards;
  const Poster = req.body.Poster;
  const imdbRating = req.body.imdbRating;
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
    createdAt
  });
  item.save()
  .then(item => res.status(200).send(`${item.Title} added`))
  .catch(err => res.status(400).json({ success: false }));
})


app.listen(port, () => console.log(`http://127.0.0.1:${port}/api/movies`));
