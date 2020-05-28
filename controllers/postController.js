const Post = require('../models/post');
const moment = require('moment');

// GET ALL POSTS /POSTS
exports.get_all_posts = function (req, res) {
    Post.find({}).then((posts) => {
        res.json(posts);
    });
};

// CREATE A POST /POST/CREATE
exports.post_post = function (req, res) {
    const { title, text, published } = req.body;
    const post = new Post({
        title,
        text,
        timestamp: moment().format('MMMM Do[,] YYYY'),
        published,
    });
    post.save().then((post) => {
        res.json(post);
    });
};

// GET A SINGLE POST /POST/:ID
exports.get_post = function (req, res) {
    Post.findById(req.params.id).then((foundPost) => {
        if (!foundPost) {
            res.json({ error: `That post doesn't exist.` });
            return;
        }
        res.json(foundPost);
    });
};

// UPDATE A POST /POST/:ID/UPDATE
exports.update_post = function (req, res, next) {
    const { title, text, published } = req.body;
    const updatedPost = {
        title,
        text,
        published,
        last_update: moment().format('MMMM Do[,] YYYY'),
    };
    Post.findByIdAndUpdate(req.params.id, updatedPost, (err, doc) => {
        if (err) return next(err);
        res.json(doc);
    });
};

// DELETE A POST /POST/:ID/DELETE
exports.delete_post = function (req, res, next) {
    Post.findByIdAndDelete(req.params.id, (err, doc) => {
        if (err) return next(err);
        res.status(200);
    });
};
