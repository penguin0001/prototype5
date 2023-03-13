const express = require('express');
const router = express.Router();

// controller
const challengeController = require('../controllers/challengeController');

// auth middleware
const checkAuthenticated = require('../middleware/checkAuthenticated');

// get routes
router.get('/', checkAuthenticated, challengeController.challenge);
router.get('/results', checkAuthenticated, challengeController.challengeResults);
router.get('/error', checkAuthenticated, challengeController.challengeError);

module.exports = router;
