var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('./passport_conf');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var api = require('./routes/api')

var app = express();

mongoose.connect(process.env.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection
db.on('error', error => console.error(error, '連結資料庫發生問題'));
db.once('open', () => console.log('連結資料庫成功'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//---------------------------------------------------
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.databaseUrl,
        ttl: 10
    }),
    cookie: {
        maxAge: 120 * 1000
    }
}));
app.use(passport.initialize());
app.use(passport.session());

function ifisAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

const noAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
};
app.get('/Chart', ifisAuthenticated, (req, res) => {
    const {
        Username
    } = req.user;
    res.render('Chart', {
        username: Username
    })
});
app.get('/setgoal', ifisAuthenticated, (req, res) => {
    const {
        Username
    } = req.user;
    res.render('setgoal', {
        username: Username
    })
});
app.post('/signup', (req, res, next) => {

    const {
        Username,
        password,
        age,
        sex
    } = req.body;
    const errors = [];
    if (!req.body.Username || !req.body.password || !req.body.age ) {
        console.log('dr');
        errors.push({
            msg: "Please Fill The Information below"
        });
    }
    if (password.length < 3) {
        console.log('press')
        errors.push({ msg: "Password length must longer then three letter" });
    };
    if (errors.length > 0) {
        res.render('signup', {
            errors,
            Username: Username,
            password: password,
            age: age
        });
    } else {
        console.log('驗證通過')
        passport.authenticate('signup', {
            successRedirect: '/login',
            failureRedirect: '/signup',
            failureFlash: true
        })(req, res, next);

    }

});
app.post('/login', passport.authenticate('login', {
    //successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}), (req, res) => res.redirect('/memberIndex'));
//------------------------------------------------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;