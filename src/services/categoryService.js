const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });
  console.log(newCategory);
  return newCategory.dataValues.id;
};

module.exports = { createCategory };