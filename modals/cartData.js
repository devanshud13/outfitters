const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productQuantity: {
        type: String,
        required: true
    },
    avtar: {
        type: String,
        required: true
    },
    Id: {
        type: String,
        required: true,
        unique: true
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