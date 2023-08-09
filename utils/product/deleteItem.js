// deleteItem.js

const fs = require("fs");

function deleteItem(request, response) {
    const id = request.query.id;
    fs.readFile("cart.txt", "utf-8", function (error, data) {
      if (error) {
        response.status(500);
        console.log(error);
      } else {
        if (data.length === 0) {
          data = "[]";
        }
        try {
          const cart = JSON.parse(data);
          const filteredProduct = cart.filter(function (product) {
            return product.id === id;
          });
          if (filteredProduct.length > 0) {
            const index = cart.indexOf(filteredProduct[0]);
            cart.splice(index, 1);
            fs.writeFile("cart.txt", JSON.stringify(cart, null, 2), function (
              err
            ) {
              if (err) {
                response.status(500);
                console.log(err);
              } else {
                response.status(200);
                response.redirect("/cart");
              }
            });
          } else {
            response.status(404);
            response.send("Product not found");
          }
        } catch (error) {
          response.status(500);
          console.log(error);
        }
      }
    });
}

module.exports = deleteItem;