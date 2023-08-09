const login = require("./utils/authentication/login");
const signup = require("./utils/authentication/signup");
const logout = require("./utils/authentication/logout");
const verifyUser = require("./utils/authentication/verifyuser");
const forgotmail = require("./utils/authentication/forgotmail");
const products = require("./utils/product/adminProducts");
const forgotPass = require("./utils/authentication/forgotPassword");
const changePassword = require("./utils/authentication/changePassword");
const cartItem = require("./utils/product/cartItem");
const addCounter = require("./utils/product/addCounter");
const subCounter = require("./utils/product/subCounter");
const deleteItem = require("./utils/product/deleteItem");
const getData = require("./utils/fetchData/getData");
const cardData = require("./utils/fetchData/cardData");
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
app.get("/cart.css",function(request,response){
    response.sendFile(__dirname+"/src/css/cart.css");
})
app.get("/home.js",function(request,response){
    response.sendFile(__dirname+"/src/js/home.js");
})
app.get("/forgotpass.js",function(request,response){
    response.sendFile(__dirname+"/src/js/forgotpass.js");
})
app.get("/cart.js",function(request,response){  
    response.sendFile(__dirname+"/src/js/cart.js");
})
app.get("/admin.js",function(request,response){
    response.sendFile(__dirname+"/src/js/admin.js");
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
app.get("/data", getData);
app.get("/cardData",cardData);
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
app.get("/changepassword", function (request, response) {
    response.render("changepassword");
})
app.get("/cart", function (request, response) {
    response.render("cart", { username: request.session.username });
})
app.post("/signup", signup);
app.post("/login", login);
app.get("/logout", logout);
app.get("/verify", verifyUser);
app.post("/product", products);
app.post("/forgot",forgotPass);
app.post("/changepassword",changePassword);
app.post("/cart", cartItem);
app.post("/add", addCounter);
app.post("/sub", subCounter);
app.post("/deleteitem", deleteItem);
app.listen(8080, () => console.log(`Example app listening on port 8080`))