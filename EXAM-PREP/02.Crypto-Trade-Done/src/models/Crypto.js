const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    minLength: [2, 'Name should be at least 2 chars'],
  },
  imageUrl: {
    type: String,
    required: [true, 'ImageUrl is required'],
    match: [/^https?:\/\//, 'Invalid Url'],
  },
  price: { type: Number, required: [true, 'Price is required'], min: 0 },

  description: {
    type: String,
    required: [true, 'Description is required!'],
    minLength: [5, 'Min length of description should be 5 chars'],
  },
  platform: {
    type: String,
    enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  boughtBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Crypto = mongoose.model('Game', cryptoSchema);

module.exports = Crypto;
