const router = require('express').Router();
// Controller
const indexController = require('../controllers/index.controller');

// Routes
router.get('/', indexController.getUsers);

module.exports = router;