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

const getByQuery = async (req, res) => {
  const { q } = req.query;
  console.log(q);
  const posts = await blogPostService.getByQuery(q);
  return res.status(200).send(posts);
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

const updatePost = async (req, res) => {
  const { title, content } = req.body;
  const updatePostBody = { title, content, id: Number(req.params.id) };
  
  await blogPostService.updatePost(updatePostBody);
 
  req.post.title = title;
  req.post.content = content;
  return res.status(200).send(req.post);
};

const deletePost = async (req, res) => {
  const postId = Number(req.params.id);
  await blogPostService.deletePost(postId);
  return res.sendStatus(204);
};

module.exports = {
  createBlogPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getByQuery,
};