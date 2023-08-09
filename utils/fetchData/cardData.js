const fs = require("fs");
function cardData(request, response) {
    fs.readFile("cart.txt", "utf-8", function (error, data) {
        if (error) {
            response.status(500);
            console.log(error);
        }
        else {
            response.status(200);
            const filteredProduct = JSON.parse(data).filter(function (product) {
                return product.username === request.session.username;
            })
            response.send(filteredProduct);
        }
    })
}

module.exports = cardData;