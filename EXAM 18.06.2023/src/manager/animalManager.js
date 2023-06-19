const Animal = require('../models/Animal');
const User = require('../models/User');

exports.create = (animalData) => Animal.create(animalData);

exports.getAll = () => Animal.find();

exports.getById = (id) => Animal.findById(id);

exports.update = (id, animalData) => Animal.findByIdAndUpdate(id, animalData);

exports.delete = (id) => Animal.findByIdAndDelete(id);

exports.findAnimalByLocation = async (search) => {
  const foundAnimals = await Animal.find({
    location: { $regex: new RegExp(search, 'i') },
  }).lean();

  return foundAnimals;
};

exports.findLastByDate = (limit) => Animal.find().sort({ date: -1 }).limit(limit);
