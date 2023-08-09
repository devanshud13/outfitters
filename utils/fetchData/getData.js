
const fs = require("fs");
function getData(request, response) {
    fs.readFile("products.txt", "utf-8", function (error, data) {
        if (error) {
            response.status(500);
            console.log(error);
        }
        else {
            response.status(200);
            response.send(data);
        }
    })
}

module.exports = getData;