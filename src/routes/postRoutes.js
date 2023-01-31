const express = require('express');
const validateJWT = require('../middlewares/auth/validateJWT');
const postCrontroller = require('../controllers/blogPostController');
const { validatePostBody } = require('../middlewares/validations');

const router = express.Router();

router.post('/', validateJWT, validatePostBody, postCrontroller.createBlogPost);

module.exports = router;