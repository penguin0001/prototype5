/* AUTH CONTROLLER: RENDER AUTH-RELATED PAGES, REGISTER/LOGIN/LOGOUT USERS */

const passport = require('passport');
const User = require('../models/users');

/* GET 'auth/register' - render register page */
const renderRegister = async (req, res) => {
     res.render('auth/register', { title: 'Register'});
};

/* GET 'auth/login' - render login page */
const renderLogin = (req, res) => {
    res.render('auth/login', { title: 'Login' });
};

/* GET 'auth/account' - render account page */
const account = async (req, res) => {
    res.render('auth/account', { title: 'Account', user: req.user});
}

/* POST 'auth/register' - add new user to database */
const register = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        console.log("all fields required");
        req.flash("error", "All fields required");
        res.status(400)
        return res.redirect('/auth/register');
    }
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.userType = req.body.usertype;
    user.setPassword(req.body.password);
    user.generateCode();
    user.save((err) => {
        if (err) {
            req.flash("error", "There was an error. That user may already exist.");
            console.log(err);
            res.status(400);
            res.redirect('/auth/register');
        } else {
            res.status(201);
            res.redirect('/auth/login');
        }
    });
};

/* POST 'auth/login'- create user session */
const login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
});

/* POST 'auth/logout' - destroy user session */
const logout = ('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

module.exports = { renderLogin, renderRegister, account, register, login, logout };