const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.post_log_in = function (req, res, next) {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.errors });
    }

    User.findOne({ username }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'No user found' });
        }
        bcrypt.compare(password, user.password, (err, success) => {
            if (err) return next(err);
            if (success) {
                const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: 3600 });
                return res.status(200).json({
                    message: 'User authenticated',
                    token,
                    username: user.username,
                    admin: user.admin,
                });
            } else {
                return res.stats(401).json({ message: 'Incorrect Password' });
            }
        });
    });
};
/* 
exports.post_sign_up = function (req, res, next) {
    const { username, password, admin } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        const user = new User({
            username,
            password: hashedPassword,
            admin,
        });
        user.save()
            .then((user) => {
                res.redirect('/');
            })
            .catch((err) => {
                next(err);
            });
    });
}; */
