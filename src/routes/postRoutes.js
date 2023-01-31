const express = require('express');
const validateJWT = require('../middlewares/auth/validateJWT');
const postController = require('../controllers/blogPostController');
const { validatePostBody } = require('../middlewares/validations');

const router = express.Router();

router.post('/', validateJWT, validatePostBody, postController.createBlogPost);

router.get('/', validateJWT, postController.getPosts);

router.get('/:id', validateJWT, postController.getPostById);

module.exports = router;