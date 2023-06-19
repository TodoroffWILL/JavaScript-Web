const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    minLength: [2, 'Name should be at least 2 chars'],
  },
  kind: {
    type: String,
    required: [true, 'Kind is required!'],
    minLength: [3, 'Kind should be at least 3 chars'],
  },
  needs: {
    type: String,
    required: [true, 'Needs is required !'],
    minLength: [3, 'Needs of should be at least 3 chars'],
    maxLength: [20, 'Needs of should be max 20 chars'],
  },
  imageUrl: {
    type: String,
    required: [true, 'ImageUrl is required'],
    match: [/^https?:\/\//, 'Invalid Url'],
  },
  years: {
    type: Number,
    required: [true, 'Years are required'],
    min: [1, 'Years should be min: 1'],
    max: [100, 'Years can be max:100'],
  },
  description: {
    type: String,
    required: [true, 'Description is required!'],
    minLength: [5, 'Min length of description should be 5 chars'],
    maxLength: [20, 'Max length of description should be 20 chars'],
  },
  location: {
    type: String,
    required: [true, 'Location is required!'],
    minLength: [5, 'Min length of location should be 5 chars'],
    maxLength: [15, 'Min length of location should be 15 chars'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  donations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  date: {
    type: mongoose.Schema.Types.Date,
  },
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
