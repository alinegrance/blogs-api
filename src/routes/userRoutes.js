const express = require('express');
const { validateNewUser } = require('../middlewares/validations');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', validateNewUser, userController.createUser);

module.exports = router;