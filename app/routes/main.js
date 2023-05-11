const express = require('express');
const router = express.Router();

// controller
const mainController = require('../controllers/mainController');

// middleware for restricting page access
const checkAuthenticated = require('../middleware/checkAuthenticated');
const checkEducator = require('../middleware/checkEducator');

// get routes
router.get('/', mainController.home);
router.get('/about', mainController.about);
router.get('/institution', checkAuthenticated, checkEducator, mainController.institution);
router.post('/institution', checkAuthenticated, checkEducator, mainController.addInstitution);

module.exports = router;
