var express = require('express');
const app = require('../app');
var router = express.Router();
const ifisAuthenticated = require('../public/javascripts/Auth');
const ifaboutAuth = require('../public/javascripts/aboutUsAuth');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
    res.render('login');
})
router.get('/signup', function(req, res, next) {
    res.render('signup');
})
router.get('/memberAboutUs', ifaboutAuth, function(req, res) {
    const {
        Username
    } = req.user;
    res.render('memberAboutUs', {
        username: Username
    })
})
router.get('/aboutUs', function(req, res) {
    res.render('aboutUs');
})
router.get('/editMember', function(req, res, next) {
        res.render('editMember');
    })
router.get('/memberIndex', ifisAuthenticated, (req, res) => {
    console.log(req.user)
    const {
        Username
    } = req.user;
    res.render('memberIndex', {
        username: Username
    })
})
router.get('/signout', function(req, res, next) {
    req.logout()
    res.redirect('/')
})
module.exports = router;