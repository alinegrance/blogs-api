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

const getPosts = async (req, res) => {
  const posts = await blogPostService.getPosts();
  return res.status(200).send(posts);
};

const getPostById = async (req, res) => {
  const postId = Number(req.params.id);
  const post = await blogPostService.getPostById(postId);
  if (!post) {
    return res.status(404).send({
      message: 'Post does not exist',
    });
  }
  return res.status(200).send(post);
};

module.exports = {
  createBlogPost,
  getPosts,
  getPostById,
};