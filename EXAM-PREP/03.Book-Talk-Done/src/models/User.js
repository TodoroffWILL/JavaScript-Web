const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minLength: [2, 'Username min length should be 2 chars'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
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
    unique: true,
    minLength: [4, 'Min length should be 4 chars'],
  },
  wishList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
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
