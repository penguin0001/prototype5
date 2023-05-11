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
router.get('/institutions', checkAuthenticated, checkEducator, mainController.institutions);

// post routes
router.post('/institutions', checkAuthenticated, checkEducator, mainController.addInstitution);
router.post('/institutions/delete/:id', checkAuthenticated, checkEducator, mainController.deleteInstitution);

module.exports = router;
