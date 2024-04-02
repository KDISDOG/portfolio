function ifaboutAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/aboutUs');
};
module.exports = ifaboutAuth;