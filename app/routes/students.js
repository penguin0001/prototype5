const express = require('express');
const router = express.Router();

// controller
const studentsController = require('../controllers/studentsController');

// auth middleware
const checkAuthenticated = require('../middleware/checkAuthenticated');
const checkNotAuthenticated = require('../middleware/checkNotAuthenticated');

// get routes
router.get('/educator', checkAuthenticated, studentsController.educator);
router.post('/educator', checkAuthenticated, studentsController.addEducator);

module.exports = router;
