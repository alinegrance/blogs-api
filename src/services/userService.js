const { User } = require('../models');

const getByEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  return user;
};

const getById = async (id) => {
  const { dataValues } = await User.findByPk(id);
  delete dataValues.password;
  return dataValues;
};

const getAll = async () => {
  const response = await User.findAll();
  const users = response
  .map(({ id, displayName, email, image }) => ({ id, displayName, email, image }));
  return users;
};

const createUser = async (displayName, email, password, image) => {
  try {
    const newUser = await User.create({ displayName, email, password, image });
    return newUser;
  } catch (err) {
    return err.errors[0].type;
  }
};

module.exports = { getByEmailAndPassword, getById, getAll, createUser };