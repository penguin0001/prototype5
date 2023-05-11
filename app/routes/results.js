const express = require('express');
const router = express.Router();

// controller
const resultsController = require('../controllers/resultsController');

// auth middleware
const checkAuthenticated = require('../middleware/checkAuthenticated');
const checkEducator = require('../middleware/checkEducator');
const checkStudent = require('../middleware/checkStudent');
const checkLinked = require('../middleware/checkLinked');

// get routes
router.get('/', checkAuthenticated, checkStudent, resultsController.results);
router.get('/:id', checkAuthenticated, checkEducator, checkLinked, resultsController.results)

// post routes
router.post('/', checkAuthenticated, checkStudent, resultsController.createResult);

module.exports = router;