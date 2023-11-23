const express = require("express");
const router = express.Router();

const OrderModel = require("../model/Order");
const Item = require("../model/Item");


router.route("/")
    .get(async (req, res) => {
        const orders = await OrderModel.find();
        return res.json(orders);
    })
    .post(async (req, res, next) => {
        const order = req.body;
        await Item.deleteMany({});

        try {
            const saved = await OrderModel.create(order);
            return res.json(saved);
        } catch (err) {
            return next(err);
        }
    })

module.exports = router;