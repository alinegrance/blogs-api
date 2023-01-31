const { ForeignKeyConstraintError } = require('sequelize');
const { BlogPost, PostCategory, sequelize } = require('../models');

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

module.exports = {
  createBlogPost,
};
