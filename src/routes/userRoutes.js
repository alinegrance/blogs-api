const express = require('express');
const { validateNewUser } = require('../middlewares/validations');
const userController = require('../controllers/userController');
const validateJWT = require('../middlewares/auth/validateJWT');

const router = express.Router();

router.post('/', validateNewUser, userController.createUser);

router.get('/', validateJWT, userController.getAll);

router.get('/:id', validateJWT, userController.getById);

module.exports = router;