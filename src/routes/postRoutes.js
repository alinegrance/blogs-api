const express = require('express');
const validateJWT = require('../middlewares/auth/validateJWT');
const postController = require('../controllers/blogPostController');
const { 
  validatePostBody, 
  validateUserPermission, 
  validateUpdatePostBody,
 } = require('../middlewares/validations');

const router = express.Router();

const validateUpdade = [validateJWT, validateUserPermission, validateUpdatePostBody];

router.post('/', validateJWT, validatePostBody, postController.createBlogPost);

router.get('/', validateJWT, postController.getPosts);

router.get('/:id', validateJWT, postController.getPostById);

router.put('/:id', validateUpdade, postController.updatePost);

router.delete('/:id', validateJWT, validateUserPermission, postController.deletePost);

module.exports = router;