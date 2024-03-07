const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const user = require('../models/user');
require('dotenv').config();

exports.register_page = asyncHandler((req, res, next) => {
    res.render("register", {title: "Register"});
});

exports.login_page = asyncHandler((req, res, next) => {
    res.render("login", {title: "Login"});
});

exports.member_page = asyncHandler(async (req, res, next) => {
    res.render("members", {title: "Become member", user: req.user});
});

exports.post_member_code = [
    body("member")
        .trim()
        .isLength({min: 1})
        .escape(),

    asyncHandler(async (req, res, next) => {
        const error = validationResult(req);

        let memberInstance;

        if(process.env.MEMBER_CODE === req.body.member){
            memberInstance = new user({
                firstname: req.user.firstname,
                surname: req.user.surname,
                password: req.user.password,
                name: req.user.name,
                admin: false,
                member: true,
            });
        } else {
            res.render("members", {title: "Become member"});
        }
        

        if(!error.isEmpty()){
            res.render("members", {title: "Become member"});
        } else{
            const updateUser = await user.findByIdAndUpdate(req.user._id, memberInstance, {});
            res.redirect("/");
        }
    })
];

exports.admin_page = asyncHandler(async (req, res, next) => {
    res.render("members", {title: "Become member", user: req.user});
});

exports.post_admin_code = [
    body("admin")
        .trim()
        .isLength({min: 1})
        .escape(),

    asyncHandler(async (req, res, next) => {
        const error = validationResult(req);
        let memberInstance;

        if(process.env.ADMIN_CODE === req.body.admin){
            memberInstance = new user({
                firstname: req.user.firstname,
                surname: req.user.surname,
                password: req.user.password,
                name: req.user.name,
                admin: true,
                member: false,
                _id: req.user._id
            });
        } else {
            res.render("members", {title: "Become member"});
        }

        if(!error.isEmpty()){
            res.render("members", {title: "Become member"});
        } else{
            const updateUser = await user.findByIdAndUpdate(req.user._id, memberInstance, {});
            res.redirect("/");
        }
    })
];