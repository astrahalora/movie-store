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

app.listen(port, () => console.log(`http://127.0.0.1:${port}/api/movies`));
