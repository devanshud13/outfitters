// add.js

const fs = require("fs");

function addItem(request, response) {
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
            filteredProduct[0].count += 1;
            const temp =
              filteredProduct[0].count * filteredProduct[0].productPrice;
            filteredProduct[0].productPrice = temp / (filteredProduct[0].count - 1);

            fs.writeFile(
              "cart.txt",
              JSON.stringify(cart, null, 2),
              function (err) {
                if (err) {
                  response.status(500);
                  console.log(err);
                } else {
                  response.status(200);
                  response.redirect("/cart");
                }
              }
            );
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

module.exports = addItem;