const Posts = require('../models/posts');
const {body, validationResult} = require('express-validator');

const asyncHandler = require('express-async-handler');

exports.get_all_posts = asyncHandler(async (req, res, next) => {
    const posts = await Posts.find().sort({date: 1}).populate("user").exec();

    res.render("index", {title: "Posts", user: req.user, posts: posts});    
});

exports.get_create_post = asyncHandler(async (req, res, next) => {
    const posts = await Posts.find().sort({title: 1}).exec();

    if(!req.user){
        res.redirect("/");
    };

    res.render("create", {title: "Create Posts", user: req.user, posts: posts});
});

exports.post_create_post = [
    body("title", "Title should not be empty.")
        .trim()
        .isLength({min: 1})
        .escape(),
    body("message", "Message should not be empty.")
        .trim()
        .isLength({min: 1})
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const postInstance = new Posts({
            user: req.body.user,
            title: req.body.title,
            message: req.body.message,
            date: Date.now()
        });

        if(!errors.isEmpty()){
            const posts = await Posts.find().sort({title: 1}).exec();
            res.render("create", {title: "Create Posts", user: req.user, posts: posts});
        } else{
            await postInstance.save();
            res.redirect(postInstance.url);
        };
    })
];

exports.get_single_post = asyncHandler(async(req, res, next) => {
    const posts = await Posts.findById(req.params.id).populate("user").exec();

    if(posts === null){
        const err = new Error("Post not found");
        err.status = 404;
        next(err);
    };

    if(!req.user){
        res.redirect("/login")
    };

    res.render("details", {title: "Details", user: req.user, postid: posts._id, posts: posts});
});

exports.get_delete_post = asyncHandler(async(req, res, next) => {
    const post = await Posts.findById(req.params.id).populate("user").exec();

    if(post === null){
        res.redirect("/");
    };
    
    if(req.user.admin === false){
        res.redirect("/");
    };

    res.render("delete", {title: "Delete Post", post: post});
});

exports.post_delete_post = asyncHandler(async (req, res, next) => {
    const post = await Posts.findById(req.params.id).populate("user").exec();

    await Posts.findByIdAndDelete(req.body.postid);
    res.redirect("/");
});