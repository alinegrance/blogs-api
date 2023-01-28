const { User } = require('../models');

const getByEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  return user;
};

const createUser = async (displayName, email, password, image) => {
  try {
    const newUser = await User.create({ displayName, email, password, image });
    return newUser;
  } catch (err) {
    return err.errors[0].type;
  }
};

module.exports = { getByEmailAndPassword, createUser };