const Book = require('../models/Book');
const User = require('../models/User');

exports.create = (bookData) => Book.create(bookData);

exports.getAll = () => Book.find();

exports.getById = (id) => Book.findById(id);

exports.update = (id, bookData) => Book.findByIdAndUpdate(id, bookData);

exports.delete = (id) => Book.findByIdAndDelete(id);

exports.getAllWishedByUserId = (userId) =>
  User.findById(userId).populate('wishList');

exports.wishedBooksByUserId = (userId) => Book.find({ wishList: userId });
