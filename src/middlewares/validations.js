const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Some required fields are missing' });
  }
  next();
};

const validateNewUser = (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (displayName.length < 8) {
    return res.status(400)
      .send({ message: '"displayName" length must be at least 8 characters long' });
  }
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400)
      .send({ message: '"email" must be a valid email' });
  }
  if (password.length < 6) {
    return res.status(400)
      .send({ message: '"password" length must be at least 6 characters long' });
  }
  next();
};

const validateCategoryBody = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ message: '"name" is required' });
  }
  next();
};

module.exports = { validateLogin, validateNewUser, validateCategoryBody };