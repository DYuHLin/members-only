const asyncHandler = require('express-async-handler');

exports.register_page = asyncHandler((req, res, next) => {
    res.render("register", {title: "Register"});
});

exports.login_page = asyncHandler((req, res, next) => {
    res.render("login", {title: "Login"});
});

exports.member_page = asyncHandler(async (req, res, next) => {
    res.render("members", {title: "Become member"});
});