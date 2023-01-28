const express = require('express');
const validadeJWT = require('../middlewares/auth/validateJWT');
const { validateCategoryBody } = require('../middlewares/validations');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/', validadeJWT, validateCategoryBody, categoryController.createCategory);

module.exports = router;