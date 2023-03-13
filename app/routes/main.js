const express = require('express');
const router = express.Router();

// controller
const mainController = require('../controllers/mainController');

// get routes
router.get('/', mainController.home);
router.get('/about', mainController.about);

module.exports = router;
