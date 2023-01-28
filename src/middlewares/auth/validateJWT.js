const jwt = require('jsonwebtoken');
require('dotenv').config();
const userService = require('../../services/userService');

const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token);
  if (!token) {
    return res.status(401).send({ message: 'Token not found' });
  }

  try {
    const { data: { userId } } = jwt.verify(token, secret);

    const user = await userService.getById(userId);

    if (!user) {
      return res.status(401).send({ message: 'Expired or invalid token' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Expired or invalid token' });
  }
};

module.exports = auth;