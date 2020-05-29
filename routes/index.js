var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');
const { check } = require('express-validator');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/api/posts', postController.get_all_posts);

router.post(
    '/api/post/create',
    [
        check('title', 'Title is required').isLength({ min: 1 }).trim().escape(),
        check('text', 'Content is required').isLength({ min: 1 }).trim().escape(),
        check('image').trim().escape(),
        check('published', 'Published status is required').not().isEmpty().trim().escape(),
    ],
    postController.post_post,
);

router.get('/api/post/:id', postController.get_post);

router.put(
    '/api/post/:id/update',
    [
        check('title', 'Title is required').isLength({ min: 1 }).trim().escape(),
        check('text', 'Content is required').isLength({ min: 1 }).trim().escape(),
        check('image').trim().escape(),
        check('published', 'Published status is required').not().isEmpty().trim().escape(),
    ],
    postController.update_post,
);

router.delete('/api/post/:id/delete', postController.delete_post);

module.exports = router;
