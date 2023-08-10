const Product = require("../../modals/product");
const Cart = require("../../modals/cartData");

function cartItem(request, response) {
  if (!request.session.isLoggedIn) {
    response.redirect("/login");
    return;
  }
  const id = request.query.id;
  const user = request.session.username;

  Product.findOne({ _id: id })
    .then(function (product) {
      if (product) {
        const filteredProduct = {
          productName: product.productName,
          productPrice: product.productPrice,
          productDescription: product.productDescription,
          productQuantity: product.productQuantity,
          avtar: product.avtar,
          username: user,
          count: 1,
        };

        Cart.create(filteredProduct)
          .then(function () {
            response.status(200);
            response.redirect("/");
          })
          .catch(function (error) {
            response.status(500);
            response.redirect("/cart");
          });
      } else {
        response.status(404);
        response.send("Product not found");
      }
    })
    .catch(function (error) {
      response.status(500);
      console.log(error);
      response.send("An error occurred while fetching the product");
    });
}

module.exports = cartItem;