const Product = require("../../modals/product");

function getData(request, response) {
  Product.find({})
    .then(function (products) {
      response.status(200);
      response.send(products);
    })
    .catch(function (error) {
      response.status(500);
      console.log(error);
      response.send("An error occurred while fetching the data");
    });
}

module.exports = getData;