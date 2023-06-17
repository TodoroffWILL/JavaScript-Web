const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Name is required!'],
    minLength: [2, 'Name should be at least 2 chars'],
  },
  author: {
    type: String,
    required: [true, 'Author is required!'],
    minLength: [2, 'Author should be at least 2 chars'],
  },
  genre: {
    type: String,
    required: [true, 'Genre is required !'],
  },
  imageUrl: {
    type: String,
    required: [true, 'ImageUrl is required'],
    match: [/^https?:\/\//, 'Invalid Url'],
  },
  stars: {
    type: Number,
    required: [true, 'Stars are required'],
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    required: [true, 'Description is required!'],
    minLength: [5, 'Min length of description should be 5 chars'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  wishList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
