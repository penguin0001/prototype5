const express = require('express');
const router = express.Router();

// controller
const institutionsController = require('../controllers/institutionsController');

// middleware for restricting page access
const checkAuthenticated = require('../middleware/checkAuthenticated');
const checkEducator = require('../middleware/checkEducator');

// get routes
router.get('/', checkAuthenticated, checkEducator, institutionsController.institutions);

// post routes
router.post('/', checkAuthenticated, checkEducator, institutionsController.addInstitution);
router.post('/delete/:id', checkAuthenticated, checkEducator, institutionsController.deleteInstitution);

module.exports = router;
