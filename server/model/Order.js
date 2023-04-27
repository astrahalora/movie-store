const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new Schema({
    client: {
        name: String,
        phone: String, 
        email: String,
        address: String,       
    },
    products: Array,
    created: {
        type: Date,
        default: Date.now
    }
});

const Order = model('Order', orderSchema);

module.exports = Order;