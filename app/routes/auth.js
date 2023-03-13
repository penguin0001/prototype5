const express = require('express');
const router = express.Router();

// controller
const authController = require('../controllers/authController');

// auth middleware
const checkAuthenticated = require('../middleware/checkAuthenticated');
const checkNotAuthenticated = require('../middleware/checkNotAuthenticated');

// get routes
router.get('/register', checkNotAuthenticated, authController.renderRegister);
router.get('/login', checkNotAuthenticated, authController.renderLogin);
router.get('/account', checkAuthenticated, authController.account);

// post routes
router.post('/register', checkNotAuthenticated, authController.register);
router.post('/login', checkNotAuthenticated, authController.login);
router.post('/logout', checkAuthenticated, authController.logout);

module.exports = router;