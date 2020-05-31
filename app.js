require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo error'));

var indexRouter = require('./routes/index');

var app = express();

passport.use(
    new jwtStrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        function (req, payload, done) {
            User.findOne({ username: payload.username }, (err, user) => {
                console.log(payload);
                if (err) return done(err);
                if (!user) {
                    return done(null, false, { message: 'Username was not found' });
                }
                bcrypt.compare(payload.password, user.password, (err, success) => {
                    if (success) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Incorrect password' });
                    }
                });
            });
        },
    ),
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors()); // NEEDS ADD ORIGIN
/* app.use(passport.authenticate('jwt', { session: false })); */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
