const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    avtar: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

const cartData = mongoose.model("cartData", cartSchema);

module.exports = cartData;