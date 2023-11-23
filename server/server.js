require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();

const port = 5000;
const {MONGO_URL} = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const movieRouter = require("./routes/Movies");
const favoriteMovies = require("./routes/FavoriteMovies");
const cart = require("./routes/Cart");
const orders = require("./routes/Orders");

app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/movies",movieRouter);
app.use("/favorites", favoriteMovies);
app.use("/cart",cart);
app.use("/orders",orders);

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(port, () => console.log(`http://127.0.0.1:${port}/api/movies`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});