const express = require('express');
const router = express.Router();

// controller
const challengeController = require('../controllers/challengeController');

// auth middleware
const checkAuthenticated = require('../middleware/checkAuthenticated');
const checkStudent = require('../middleware/checkStudent');

// get routes
router.get('/', checkAuthenticated, checkStudent, challengeController.challenge);
router.get('/results', checkAuthenticated, checkStudent, challengeController.challengeResults);
router.get('/error', checkAuthenticated, checkStudent, challengeController.challengeError);

module.exports = router;
