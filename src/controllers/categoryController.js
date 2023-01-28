const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const newCategory = req.body.name;
  const newCategoryId = await categoryService.createCategory(newCategory);
  res.status(201).send({ id: newCategoryId, name: newCategory });
};

module.exports = { createCategory };