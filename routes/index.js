var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');
const { check } = require('express-validator');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: '/mnt/c/Users/pc/the-odin-project/nodejs-course/blog-api/public/images',
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname} - ${Date.now()}${path.extname(file.originalname)}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 10000000 },
    fileFilter,
});

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
    upload.single('image'),
    [
        check('title', 'Title is required').isLength({ min: 1 }).trim().escape(),
        check('text', 'Content is required').isLength({ min: 1 }).trim().escape(),
        check('published', 'Published status is required').not().isEmpty().trim().escape(),
    ],
    postController.post_post,
);

router.put(
    '/api/post/:id/update',
    passport.authenticate('jwt', {
        session: false,
    }),
    upload.single('image'),
    [
        check('title').trim().escape(),
        check('text').trim().escape(),
        check('published', 'Published status is required').not().isEmpty().trim().escape(),
    ],
    postController.update_post,
);

router.put(
    '/api/post/:id/update-published-status',
    passport.authenticate('jwt', { session: false }),
    [check('published').trim().escape()],
    postController.update_published_status,
);

router.delete(
    '/api/post/:id/delete',
    passport.authenticate('jwt', {
        session: false,
    }),
    postController.delete_post,
);

router.post('/api/log-in/', userController.post_log_in);

router.get('/api/post/:id/comments', commentController.get_post_comments);

router.post(
    '/api/post/:id/comments',
    [
        check('commenter').trim().escape(),
        check('comment').isLength({ min: 1, max: 200 }).trim().escape(),
    ],
    commentController.post_blog_comment,
);

router.put(
    '/api/post/:id/comments/:commentId',
    passport.authenticate('jwt', { session: false }),
    [
        check('commenter').trim().escape(),
        check('comment').isLength({ min: 1, max: 200 }).trim().escape(),
    ],
    commentController.put_blog_comment,
);

router.delete(
    '/api/post/:id/comments/:commentId',
    passport.authenticate('jwt', { session: false }),
    commentController.delete_blog_comment,
);

module.exports = router;
