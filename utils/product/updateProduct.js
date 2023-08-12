const Product = require("../../modals/product");

function updateProduct(request, response) {
    Product.findOneAndUpdate({ _id: request.query.id }, {
        productName: request.body.productName,
        productPrice: request.body.productPrice,
        productDescription: request.body.productDescription,
        productQuantity: request.body.productQuantity,
        avtar: request.file.filename,
    }).then(function (updatedProduct) {
        if (updatedProduct) {
            response.status(200);
            response.redirect("/admin");
        } else {
            response.status(404);
            response.send("Product not found");
        }
    })
}

module.exports = updateProduct;