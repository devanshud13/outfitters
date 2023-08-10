const Product = require("../../modals/product");

function products(request, response) {
  const productName = request.body.productName;
  const productPrice = request.body.productPrice;
  const productDescription = request.body.productDescription;
  const productQuantity = request.body.productQuantity;
  const avtar = request.file;
  const newProduct = {
    productName: productName,
    productPrice: productPrice,
    productDescription: productDescription,
    productQuantity: productQuantity,
    avtar: avtar.filename,
  };

  Product.create(newProduct)
    .then(function () {
      response.status(200);
      response.redirect("/admin");
    })
    .catch(function (error) {
      response.status(500);
      console.log(error);
      response.send("An error occurred while creating the product");
    });
}

module.exports = products;