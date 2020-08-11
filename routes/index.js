const router = require('express').Router();
//// Controller
const indexController = require('../controllers/index.controller');

// Routes

router.get('/users', indexController.getUsers);
router.post('/users', indexController.createUser);
router.get('/users/:id', indexController.getUserById);
router.put('/users/:id', indexController.updateUser);
router.delete('/users/:id', indexController.deleteUser);
module.exports = router;