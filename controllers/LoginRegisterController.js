const asyncHandler = require('express-async-handler');

exports.register_page = asyncHandler((req, res, next) => {
    res.render("register", {title: "Register"});
});

exports.login_page = asyncHandler((req, res, next) => {
    res.render("login", {title: "Login"});
});