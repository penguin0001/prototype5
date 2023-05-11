/* AUTH CONTROLLER: RENDER AUTH-RELATED PAGES, REGISTER/LOGIN/LOGOUT USERS */

const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/users');
const Institution = require('../models/institutions');

/* GET 'auth/register' - render register page */
const renderRegister = async (req, res) => {
    const institutions = await Institution.find();
    res.render('auth/register', { title: 'Register', institutions: institutions });
};

/* GET 'auth/login' - render login page */
const renderLogin = (req, res) => {
    res.render('auth/login', { title: 'Login' });
};

/* GET 'auth/account' - render account page */
const account = async (req, res) => {
    if (req.user.institution) {
        const institution = await Institution.findById(req.user.institution);
        res.render('auth/account', { title: 'Account', user: req.user, institution: institution});
    } else {
        res.render('auth/account', { title: 'Account', user: req.user});
    }
    
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
    if (req.body.institution) {
        user.institution = req.body.institution;
    }
    user.setPassword(req.body.password);
    user.generateCode();
    user.save((err) => {
        if (err) {
            req.flash("error", "There was an error. That user may already exist.");
            console.log(err);
            res.status(404)
            res.redirect('/auth/register');
        } else {
            res.status(200)
            res.redirect('/');
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