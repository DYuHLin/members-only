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

router.get("/membership", loginRegisterController.member_page);
router.post("/membership", loginRegisterController.post_member_code);

router.get("/admin", loginRegisterController.admin_page);
router.post("/admin", loginRegisterController.post_admin_code);

router.get('/create', postController.get_create_post);
router.post('/create', postController.post_create_post);

router.get('/:id/update', postController.get_update_post);
router.post('/:id/update', postController.post_update_post);

router.get('/:id', postController.get_single_post);

router.get('/:id/delete', postController.get_delete_post);
router.post('/:id/delete', postController.post_delete_post);

module.exports = router;
