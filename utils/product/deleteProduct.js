const Product = require("../../modals/product");
const fs = require("fs");

function deleteProduct(request, response) {
  const id = request.query.id;

  Product.findOneAndDelete({ _id: id})
    .then(function (deletedProduct) {
        if (deletedProduct) {
            fs.unlinkSync(`uploads/${deletedProduct.avtar}`);
            response.status(200);
            response.redirect("/admin");
        } else {
            response.status(404);
            response.send("Product not found");
        }
        }
    )
}

module.exports = deleteProduct;