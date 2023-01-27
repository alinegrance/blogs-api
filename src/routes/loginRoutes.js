const express = require('express');
const { validateLogin } = require('../middlewares/validations');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', validateLogin, userController.login);

module.exports = router;