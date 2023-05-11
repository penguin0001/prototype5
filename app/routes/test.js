const express = require('express');
const router = express.Router();

// controller
const testController = require('../controllers/testController');

// auth middleware
const checkAuthenticated = require('../middleware/checkAuthenticated');

// get routes
router.get('/', checkAuthenticated, testController.test);
router.get('/results', checkAuthenticated, testController.testResults);
router.get('/error', checkAuthenticated, testController.testError);

module.exports = router;
