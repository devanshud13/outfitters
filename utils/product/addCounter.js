const Cart = require("../../modals/cartData");

function addItem(request, response) {
  const id = request.query.id;

  Cart.findOne({ _id: id, username: request.session.username })
    .then(function (cartItem) {
      if (cartItem) {
        cartItem.count += 1;
        const temp = cartItem.count * cartItem.productPrice;
        cartItem.productPrice = temp / (cartItem.count - 1);

        cartItem.save()
          .then(function () {
            response.status(200);
            response.redirect("/cart");
          })
          .catch(function (error) {
            response.status(500);
            console.log(error);
            response.send("An error occurred while updating the cart item");
          });
      } else {
        response.status(404);
        response.send("Product not found");
      }
    })
    .catch(function (error) {
      response.status(500);
      console.log(error);
      response.send("An error occurred while fetching the cart item");
    });
}

module.exports = addItem;