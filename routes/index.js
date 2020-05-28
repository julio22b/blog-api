var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/posts', postController.get_all_posts);

router.post('/post/create', postController.post_post);

router.get('/post/:id', postController.get_post);

router.put('/post/:id/update', postController.update_post);

router.delete('/post/:id/delete', postController.delete_post);

module.exports = router;
