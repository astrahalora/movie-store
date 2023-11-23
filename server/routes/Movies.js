const express = require("express");
const router = express.Router();
const path = require("path");

const {reader} = require("../fileReader");
const filePath = path.join(`./movies.json`);

router.route("/").get(async (req, res) => {
    try {
        const response = await reader(filePath);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send("Data could not be found");
    }
});

module.exports = router;