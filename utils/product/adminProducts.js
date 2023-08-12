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
  Product.findOne({ productName: productName })
    .then(function (producte) {
      if (producte) {
        response.send("product already exists")
      } else {
        Product.create(newProduct)
          .then(function (producte) {
            response.status(200);
            response.redirect("/admin");
          })
          .catch(function (error) {
            response.status(500);
            console.log(error);
            response.send("An error occurred ");
          });
      }
    })
    .catch(function (error) {
      response.status(500);
      console.log(error);
      response.send("An error occurred while fetching the product");
    });
}

module.exports = products;