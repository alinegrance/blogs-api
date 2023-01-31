const blogPostService = require('../services/blogPostService');

const createBlogPost = async (req, res) => {
  const postInfo = { ...req.body, userId: req.user.id };
  try {
    const newBlogPost = await blogPostService.createBlogPost(postInfo);
    return res.status(201).send(newBlogPost);
  } catch (e) {
    console.log(e);
    if (e.message === 'category_not_found') {
      return res.status(400).send({
        message: 'one or more "categoryIds" not found',
      });
    } 
      return res.sendStatus(500);
  }
};

module.exports = {
  createBlogPost,
};