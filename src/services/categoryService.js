const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });
  console.log(newCategory);
  return newCategory.dataValues.id;
};

const getAll = async () => {
  const categories = Category.findAll();
  return categories;
};

module.exports = { createCategory, getAll };