const fs = require("fs");
const {uid} = require("uid");

function products(request, response) {
        const productName = request.body.productName;
        const productPrice = request.body.productPrice;
        const productDescription = request.body.productDescription;
        const productQuantity = request.body.productQuantity;
        const avtar = request.file;
        const num = uid();
        const newProduct = {
            productName: productName,
            productPrice: productPrice,
            productDescription: productDescription,
            productQuantity: productQuantity,
            avtar: avtar.filename,
            id: num,
            username: null,
            count: 1,
        };
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
                    products.push(newProduct);
                    fs.writeFile("products.txt",JSON.stringify(products, null, 2),function (err) {
                            if (err) {
                                response.status(500);
                                console.log(err);
                            } else {
                                response.status(200);
                                response.redirect("/admin");
                            }
                        }
                    );
                } catch (error) {
                    response.status(500);
                    console.log(error);
                }
            }
        });
}

module.exports = products;