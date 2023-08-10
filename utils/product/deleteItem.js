const Cart = require("../../modals/cartData");

function deleteItem(request, response) {
  const id = request.query.id;

  Cart.findOneAndDelete({ _id: id, username: request.session.username })
    .then(function (deletedItem) {
      if (deletedItem) {
        response.status(200);
        response.redirect("/cart");
      } else {
        response.status(404);
        response.send("Product not found");
      }
    })
    .catch(function (error) {
      response.status(500);
      console.log(error);
      response.send("An error occurred while deleting the product from the cart");
    });
}

module.exports = deleteItem;