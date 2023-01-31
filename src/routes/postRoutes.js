const express = require('express');
const validateJWT = require('../middlewares/auth/validateJWT');
const postController = require('../controllers/blogPostController');
const { 
  validatePostBody, 
  validateUserPermissionToPost, 
  validateUpdatePostBody,
 } = require('../middlewares/validations');

const router = express.Router();

const validateUpdade = [validateJWT, validateUserPermissionToPost, validateUpdatePostBody];

router.post('/', validateJWT, validatePostBody, postController.createBlogPost);

router.get('/', validateJWT, postController.getPosts);

router.get('/:id', validateJWT, postController.getPostById);

router.put('/:id', validateUpdade, postController.updatePost);

module.exports = router;