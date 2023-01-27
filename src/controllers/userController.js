require('dotenv').config();
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const secret = process.env.JWT_SECRET || 'secretToken';

const login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await userService.getByEmailAndPassword(email, password);
  
  if (!user) {
    return res.status(400).send({ message: 'Invalid fields' });
  }
  
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);

  res.status(200).send({ token });
};

module.exports = { login };