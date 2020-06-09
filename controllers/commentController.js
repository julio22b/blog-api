const Comment = require('../models/comment');
const moment = require('moment');
const { validationResult } = require('express-validator');

exports.get_post_comments = function (req, res, next) {
    Comment.find({ post: req.params.id })
        .then((comments) => {
            res.status(200).json(comments);
        })
        .catch((error) => {
            next(error);
        });
};

exports.post_blog_comment = function (req, res, next) {
    const { commenter, comment } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors.errors);
    }

    const newComment = new Comment({
        username: commenter || 'Anonymous',
        text: comment,
        post: req.params.id,
        timestamp: moment().format('MM-DD-YYYY [at] HH:MM'),
    });
    newComment
        .save()
        .then((document) => {
            res.status(200).json({ message: 'Comment posted.', document });
        })
        .catch((error) => {
            next(error);
        });
};

exports.put_blog_comment = function (req, res, next) {
    const { commenter, comment } = req.body;
    const updatedComment = {
        username: commenter || 'Anonymous',
        text: comment,
    };
    Comment.findByIdAndUpdate(
        req.params.commentId,
        updatedComment,
        { new: true },
        (err, document) => {
            if (err) return next(err);
            res.status(200).json(document);
        },
    );
};

exports.delete_blog_comment = function (req, res, next) {
    Comment.findByIdAndDelete(req.params.commentId, (err, document) => {
        if (err) return next(err);
        res.status(200).json({ message: 'Comment deleted' });
    });
};
