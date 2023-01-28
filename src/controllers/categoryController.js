const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const newCategory = req.body.name;
  const newCategoryId = await categoryService.createCategory(newCategory);
  res.status(201).send({ id: newCategoryId, name: newCategory });
};

const getAll = async (_req, res) => {
  const categories = await categoryService.getAll();
  res.status(200).send(categories);
};

module.exports = { createCategory, getAll };