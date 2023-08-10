const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
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
    }
});

const productData = mongoose.model("Products", productSchema);

module.exports = productData;