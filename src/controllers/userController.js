require('dotenv').config();
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await userService.getByEmailAndPassword(email, password);
  
  if (!user) {
    return res.status(400).send({ message: 'Invalid fields' });
  }

  const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);

  res.status(200).send({ token });
};

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  
  try {
    const newUser = await userService.createUser(displayName, email, password, image);
    const newUserId = newUser.dataValues.id;
    
    const token = jwt.sign({ data: { userId: newUserId } }, secret, jwtConfig);
  
    res.status(201).send({ token });
  } catch (e) {
    if (e.message === 'user_already_exists') {
      return res.status(409).send({ message: 'User already registered' });
    } 
      return res.sendStatus(500);
  }
};

const getAll = async (_req, res) => {
  const users = await userService.getAll();
  return res.status(200).send(users);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);
  
  if (!user) {
    return res.status(404).send({ message: 'User does not exist' });
  }
  res.status(200).send(user);
};

const deleteUser = async (req, res) => {
  const userId = req.user.id;
  await userService.deleteUser(userId);
  return res.sendStatus(204);
};

module.exports = { login, createUser, getAll, getById, deleteUser };