const User = require('../models/User');
const bcrypt = require('bcrypt');

// JsonWebToken
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/secret');

exports.login = async (email, password) => {
  // Find user by username or email. Dont forget to change
  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    throw new Error('Invalid user or password!');
  }
  //check password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid user or password!');
  }

  const token = await generateToken(user);
  return token;
};

exports.register = async (userData) => {
  const user = await User.findOne({ username: userData.username });

  if (user) {
    throw new Error('Username already exists');
  }
  const createdUser = await User.create(userData);
  const token = await generateToken(createdUser);

  return token;
};

async function generateToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };

  const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

  return token;
}
