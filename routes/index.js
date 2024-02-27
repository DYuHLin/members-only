var express = require('express');
var router = express.Router();
const loginRegisterController = require("../controllers/LoginRegisterController");
const postController = require("../controllers/PostController");

/* GET home page. */
router.get('/', postController.get_all_posts);

router.get('/login', loginRegisterController.login_page);

router.get('/register', loginRegisterController.register_page);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if(err){
        next(err);
    } else {
     res.redirect("/");   
    }
  });
});

router.get('/create', postController.get_create_post);

router.get('/:id', postController.get_single_post);

module.exports = router;
