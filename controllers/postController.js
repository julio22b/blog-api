const Post = require('../models/post');
const moment = require('moment');
const { validationResult } = require('express-validator');

// GET ALL POSTS /POSTS
exports.get_all_posts = function (req, res) {
    Post.find({}).then((posts) => {
        res.json(posts);
    });
};

// CREATE A POST /POST/CREATE
exports.post_post = function (req, res) {
    const { title, text, published } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors.errors);
        return;
    }
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
    console.log(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors.errors);
        return;
    }
    const updatedPost = {
        title,
        text,
        published,
        last_update: moment().format('MMMM Do[,] YYYY'),
    };
    Post.findByIdAndUpdate(req.params.id, updatedPost, { new: true })
        .then((updated) => {
            console.log(updated);
            res.status(200).json({ message: 'Post updated', updated });
        })
        .catch((err) => {
            return next(err);
        });
};

// UPDATE A POST PUBLISHE DSTATUS /POST/:ID/UPDATE-PUBLISHED-STATUS
exports.update_published_status = function (req, res, next) {
    const { published } = req.body;
    Post.findByIdAndUpdate(req.params.id, { published }, { new: true })
        .then((updatedDoc) => {
            res.json(updatedDoc);
        })
        .catch((err) => {
            return next(err);
        });
};

// DELETE A POST /POST/:ID/DELETE
exports.delete_post = function (req, res, next) {
    Post.findByIdAndDelete(req.params.id, (err, doc) => {
        if (err) return next(err);
        res.status(200).json({ message: 'Post deleted' });
    });
};
