const { UniqueConstraintError } = require('sequelize');
const { User } = require('../models');

const getByEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  return user;
};

const getById = async (id) => {
  try {
    const { dataValues } = await User.findByPk(id);
    delete dataValues.password;
    return dataValues;
  } catch (e) {
    return null;
  }
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
    console.log(err);
    if (err instanceof UniqueConstraintError) {
      throw Error('user_already_exists');
    } else {
      throw Error('unknown');
    }
  }
};

module.exports = { getByEmailAndPassword, getById, getAll, createUser };