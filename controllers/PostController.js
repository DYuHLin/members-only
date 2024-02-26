const asyncHandler = require('express-async-handler');

exports.get_all_posts = asyncHandler((req, res, next) => {
    res.render("index", {title: "Posts"});
});

exports.get_create_post = asyncHandler((req, res, next) => {
    res.render("create", {title: "Posts"});
});

exports.get_single_post = asyncHandler((req, res, next) => {
    res.render("details", {title: "Details"});
});