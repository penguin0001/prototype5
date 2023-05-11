const express = require('express');
const router = express.Router();

// controller
const studentsController = require('../controllers/studentsController');
const resultsController = require('../controllers/resultsController');

// middleware for restricting page access
const checkAuthenticated = require('../middleware/checkAuthenticated');
const checkStudent = require('../middleware/checkStudent');
const checkEducator = require('../middleware/checkEducator');

// get routes
router.get('/educator', checkAuthenticated, checkStudent, studentsController.educator);
router.post('/educator', checkAuthenticated, checkStudent, studentsController.addEducator);

router.get('/', checkAuthenticated, checkEducator, studentsController.students)
router.post('/', checkAuthenticated, checkEducator, studentsController.addStudent)


module.exports = router;
