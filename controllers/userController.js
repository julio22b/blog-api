const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.post_log_in = function (req, res, next) {
    const { username, password } = req.body;

    User.findOne({ username }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({ message: 'no user found' });
        }
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: 3600 });
        return res.status(200).json({
            message: 'User authenticated',
            token,
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
