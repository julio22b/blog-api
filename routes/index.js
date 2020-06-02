var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const { check } = require('express-validator');
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

/* router.post('/api/sign-up', userController.post_sign_up); */

router.get('/api/posts', postController.get_all_posts);

router.get('/api/post/:id', postController.get_post);

router.post(
    '/api/post/create',
    passport.authenticate('jwt', {
        session: false,
    }),
    [
        check('title', 'Title is required').isLength({ min: 1 }).trim().escape(),
        check('text', 'Content is required').isLength({ min: 1 }).trim().escape(),
        check('image').trim().escape(),
        check('published', 'Published status is required').not().isEmpty().trim().escape(),
    ],
    postController.post_post,
);

router.put(
    '/api/post/:id/update',
    passport.authenticate('jwt', {
        session: false,
    }),
    [
        check('title', 'Title is required').isLength({ min: 1 }).trim().escape(),
        check('text', 'Content is required').isLength({ min: 1 }).trim().escape(),
        check('image').trim().escape(),
        check('published', 'Published status is required').not().isEmpty().trim().escape(),
    ],
    postController.update_post,
);

router.delete(
    '/api/post/:id/delete',
    passport.authenticate('jwt', {
        session: false,
    }),
    postController.delete_post,
);

router.post('/api/log-in/', userController.post_log_in);

module.exports = router;
