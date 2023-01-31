const PostCategory = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory',
  {
    categoryId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    }
  },
  {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  });
  
  postCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'categories',
      through: postCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'posts',
      through: postCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  }

  return postCategory;
}

module.exports = PostCategory;