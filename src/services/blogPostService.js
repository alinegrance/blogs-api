const { ForeignKeyConstraintError } = require('sequelize');
const { BlogPost, User, Category, PostCategory, sequelize } = require('../models');

const createBlogPost = async ({ title, content, categoryIds, userId }) => {
  const t = await sequelize.transaction();
  try {
    const newBlogPost = await BlogPost.create(
      { title, content, userId }, { transaction: t },
    );
    const postId = newBlogPost.dataValues.id;
    
    await Promise.all(categoryIds.map((categoryId) => PostCategory.create(
        { postId, categoryId },
        { transaction: t },
      )));

    await t.commit();
    return newBlogPost;
  } catch (e) {
    await t.rollback();
    if (e instanceof ForeignKeyConstraintError) throw Error('category_not_found');
    else { throw Error('unknown'); }
  }
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  console.log(posts);
  return posts;
};

module.exports = {
  createBlogPost,
  getPosts,
};