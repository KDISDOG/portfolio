const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
//const users = require('./users');
const User = require('./models/users');

const registerStrategy = new LocalStrategy({
    usernameField: 'Username',
    passReqToCallback: true
}, (req, Username, password, done) => {
    console.log('尋找是否有一樣的使用者暱稱')
    User.findOne({
        Username: Username
    }, async(err, user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            console.log('此暱稱已被使用');
            return done(null, false, req.flash('error', 'Username has been used'));
        } else {
            let newUser = new User({
                Username: Username,
                password: await bcrypt.hash(password, 10),
                height: req.body.height,
                age: req.body.age,
                // sex: req.body.sex
            });
            newUser.save((err, user) => {
                if (err) {
                    throw err;
                }
                console.log('註冊成功');
                return done(null, user, req.flash('success', 'registration success'));
            });
        }
    });
    passport.serializeUser((user, done) => {
        done(null, user.id)
    });
    passport.deserializeUser(async(id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

});
const loginStrategy = new LocalStrategy({
    usernameField: 'Username',
    passReqToCallback: true
}, (req, Username, password, done) => {
    console.log('尋找是否有一樣的使用者')
    User.findOne({
        Username: Username
    }, (err, user) => {
        const isValidPassword = (user, password) => {
            return bcrypt.compareSync(password, user.password)
        }
        if (err) { return done(err) }
        if (!user) {
            console.log('沒有此使用者')
            return done(null, false, req.flash('info', 'User not found!!'))
        }
        if (!isValidPassword(user, password)) {
            console.log('密碼錯誤')
            return done(null, false, req.flash('info', 'Invalid password!!'))
        }
        console.log('使用者帳號密碼正確')
        return done(null, user)
    })

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });
    passport.deserializeUser(async(id, done) => {
        try {
            let user = await User.findById(id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: "User doesn't exist "
                });
            }
        } catch (e) {
            done(e);
        }
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
});
passport.use('login', loginStrategy);
passport.use('signup', registerStrategy);
module.exports = passport;
// module.exports = initialize;