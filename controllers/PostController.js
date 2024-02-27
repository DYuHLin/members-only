const Posts = require('../models/posts');
const {body, ValidationResult} = require('express-validator');

const asyncHandler = require('express-async-handler');

exports.get_all_posts = asyncHandler((req, res, next) => {
    if(!req.user){
        res.redirect("/login");
    } else {
        res.render("index", {title: "Posts", user: req.user});
    }; 
});

exports.get_create_post = asyncHandler((req, res, next) => {
    res.render("create", {title: "Create Posts", user: req.user});
});

exports.post_create_post = [

];

exports.get_single_post = asyncHandler((req, res, next) => {
    res.render("details", {title: "Details"});
});