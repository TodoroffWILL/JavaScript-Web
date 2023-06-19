const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    minLength: [10, 'Email min length should be 10 chars'],
    validate: {
      validator: function (email) {
        return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
      },
      message: (props) => `${props.value} is not a valid email.`,
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
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
