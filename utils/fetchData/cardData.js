const Cart = require("../../modals/cartData");

function cardData(request, response) {
  Cart.find({ username: request.session.username })
    .then(function (cartItems) {
      response.status(200);
      response.send(cartItems);
    })
    .catch(function (error) {
      response.status(500);
      console.log(error);
      response.send("An error occurred while fetching the cart data");
    });
}

module.exports = cardData;