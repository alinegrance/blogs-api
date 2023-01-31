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
      as: 'posts',
      through: postCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  }

  return postCategory;
}

module.exports = PostCategory;