const express = require('express');
const router = express.Router();

// controller
const resultsController = require('../controllers/resultsController');

// auth middleware
const checkAuthenticated = require('../middleware/checkAuthenticated');

// get routes
router.get('/', checkAuthenticated, resultsController.results);

// post routes
router.post('/', checkAuthenticated, resultsController.createResult);

module.exports = router;