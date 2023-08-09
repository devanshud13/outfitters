const login = require("./utils/authentication/login");
const signup = require("./utils/authentication/signup");
const logout = require("./utils/authentication/logout");
const forgotmail = require("./utils/authentication/forgotmail");
const express = require("express");
var session = require('express-session')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express();
const fs = require("fs");
const {uid}  = require("uid");




app.use(function (req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))
app.use(upload.single('avtar'));
app.use(express.static("src"));
app.use(express.static("src/images"));
app.use(express.static("uploads"));
app.set("view engine", "ejs");
app.get('/', function(request,response){
    response.render('home',{username: request.session.username});
})
app.get("/home.css",function(request,response){
    response.sendFile(__dirname+"/src/css/home.css");
})
app.get("/productCard.css",function(request,response){
    response.sendFile(__dirname+"/src/css/productCard.css");
})
app.get("/header.css",function(request,response){
    response.sendFile(__dirname+"/src/css/header.css");
})
app.get("/login.css",function(request,response){
    response.sendFile(__dirname+"/src/css/login.css");
})
app.get("/signup.css",function(request,response){
    response.sendFile(__dirname+"/src/css/signup.css");
})
app.get("/admin.css",function(request,response){
    response.sendFile(__dirname+"/src/css/admin.css");
})
app.get("/home.js",function(request,response){
    response.sendFile(__dirname+"/src/js/home.js");
})
app.get("/forgotpass.js",function(request,response){
    response.sendFile(__dirname+"/src/js/forgotpass.js");
})
app.get("/signup", function (request, response) {
    const Email = request.session.email;
    request.session.email = null;
    if (request.session.isLoggedIn) {
        response.redirect("signup", { username: request.session.username });
    } else {
        response.render("signup", { username: request.session.username, email: Email });
    }
})
app.get("/verify", function (request, response) {
    const id = request.query.id;
    fs.readFile("user.txt", "utf-8", function (error, data) {
        if (error) {
            response.status(500);
            console.log(error);
        }
        else {
            if (data.length === 0) {
                data = "[]";
            }
            try {
                const users = JSON.parse(data);
                const filteredUser = users.filter(function (user) {
                    return user.id === id;
                })
                if (filteredUser.length > 0) {
                    filteredUser[0].verified = true;
                    fs.writeFile("user.txt", JSON.stringify(users, null, 2), function (err) {
                        if (err) {
                            response.status(500);
                            console.log(err);
                        }
                        else {
                            response.status(200);
                            response.redirect("/login");
                        }
                    });
                }
                else {
                    response.status(404);
                    response.send("User not found");
                }
            } catch (error) {
                response.status(500);
                console.log(error);
            }
        }
    })
})

app.get("/login", function (request, response) {
    const user = request.session.usernotfound;
    request.session.usernotfound = false;
    if (request.session.isLoggedIn) {
        response.redirect("login", { username: request.session.username });
        return;
    } else {
        response.render('login', { username: request.session.username, usernotfound: user });
    }
})
app.get("/admin", function (request, response) {
    if (request.session.username === "Devanshu") {
        response.render("admin", { username: "Devanshu" });
    } else {
        response.render("login", { username: request.session.username, usernotfound: false });
    }
})
app.get("/data", function (request, response) {
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
})
app.post("/product", function (request, response) {
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
        id: num
        }
        fs.readFile("products.txt", "utf-8", function (error, data) {
            if (error) {
                response.status(500);
                console.log(error);
            }
            else {
                if (data.length === 0) {
                    data = "[]";
                }
                try {
                    const products = JSON.parse(data);
                    products.push(newProduct);
                    fs.writeFile("products.txt", JSON.stringify(products, null, 2), function (err) {
                        if (err) {
                            response.status(500);
                            console.log(err);
                        }
                        else {
                            response.status(200);
                            response.redirect("/admin");
                        }
                    });
                } catch (error) {
                    response.status(500);
                    console.log(error);
                }
            }
        })
})
app.get("/forgot", function (request, response) {
    const email = request.query.email;
    request.session.email = email;
    response.render("forgotpass");
    console.log(email);
})
app.get("/forgotmail", function (request, response) {
    response.render("forgotmail");
})
app.post("/forgotmail", function (request, response) {
    const email = request.body.email;
    forgotmail(email);
    response.redirect("/signup");
})  
app.post("/forgot", function (request, response) {
    const email = request.session.email;
    const password = request.body.confirmpassword
    fs.readFile("user.txt", "utf-8", function (error, data) {
        if (error) {
            response.status(500);
            console.log(error);
        }
        else {
            if (data.length === 0) {
                data = "[]";
            }
            try {
                const users = JSON.parse(data);
                const filteredUser = users.filter(function (user) {
                    return user.email === email;
                })
                if (filteredUser.length > 0) {
                    filteredUser[0].password = password;
                    fs.writeFile("user.txt", JSON.stringify(users, null, 2), function (err) {
                        if (err) {
                            response.status(500);
                            console.log(err);
                        }
                        else {
                            response.status(200);
                            response.redirect("/login");
                        }
                    });
                }
                else {
                    response.status(404);
                    response.send("User notm found");
                }
            } catch (error) {
                response.status(500);
                console.log(error);
            }
        }
    })
})
app.get("/changepassword", function (request, response) {
    response.render("changepassword");
})
app.post("/changepassword", function (request, response) {
    const email = request.body.email;
    const password = request.body.confirmpassword
    fs.readFile("user.txt", "utf-8", function (error, data) {
        if (error) {
            response.status(500);
            console.log(error);
        }
        else {
            if (data.length === 0) {
                data = "[]";
            }
            try {
                const users = JSON.parse(data);
                const filteredUser = users.filter(function (user) {
                    return user.email === email;
                })
                if (filteredUser.length > 0) {
                    filteredUser[0].password = password;
                    fs.writeFile("user.txt", JSON.stringify(users, null, 2), function (err) {
                        if (err) {
                            response.status(500);
                            console.log(err);
                        }
                        else {
                            response.status(200);
                            response.redirect("/");
                        }
                    });
                }
                else {
                    response.status(404);
                    response.send("User not found");
                }
            } catch (error) {
                response.status(500);
                console.log(error);
            }
        }
    })
})
app.post("/signup", signup);
app.post("/login", login);
app.get("/logout", logout);
app.listen(8080, () => console.log(`Example app listening on port 8080!`))