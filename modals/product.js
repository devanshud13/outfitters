const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
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
    }
});

const productData = mongoose.model("Products", productSchema);

module.exports = productData;