// cart.js

const fs = require("fs");

function cartItem(request, response) {
    if (!request.session.isLoggedIn) {
      response.redirect("/login");
      return;
    }
    const id = request.query.id;
    const user = request.session.username;
    fs.readFile("products.txt", "utf-8", function (error, data) {
      if (error) {
        response.status(500);
        console.log(error);
      } else {
        if (data.length === 0) {
          data = "[]";
        }
        try {
          const products = JSON.parse(data);
          const filteredProduct = products.filter(function (product) {
            return product.id === id;
          });
          if (filteredProduct.length > 0) {
            filteredProduct[0].username = user;
            filteredProduct[0].count = 1;

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
                  cart.push(filteredProduct[0]);
                  fs.writeFile("cart.txt", JSON.stringify(cart, null, 2),function (err) {
                      if (err) {
                        response.status(500);
                        console.log(err);
                      } else {
                        response.status(200);
                        response.redirect("/");
                      }
                    }
                  );
                } catch (error) {
                  response.status(500);
                  console.log(error);
                }
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

module.exports = cartItem;