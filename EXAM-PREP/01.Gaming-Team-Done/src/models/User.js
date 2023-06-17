const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minLength: [2, 'Min length should be 2 chars'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    minLength: [10, 'Min length should be 10 chars'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    unique: true,
    minLength: [4, 'Min length should be 4 chars'],
  },
});

userSchema.virtual('repeatPassword').set(function (value) {
  if (this.password !== value) {
    throw new Error('Password missmatch');
  }
});

userSchema.pre('save', async function () {
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  } catch (error) {
    console.log(error.message);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
