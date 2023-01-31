const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated:  {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    }
  },
  {
    tableName: 'blog_posts',
    timestamps: false,
    underscored: true,
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user'
    });
  }
  return blogPost;
}

module.exports = BlogPost;