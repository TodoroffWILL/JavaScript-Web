const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Message can be here'],
    minLength: [3, 'Custom Min length message'],
    maxLength: 20,
  }, // Specificly validators
  age: Number,
  breed: String,
});

// Instance Method
catSchema.methods.greet = function () {
  // "this" сочи към инстанцията на този модел "catSchema"
  console.log(`I am this ${this.name} and ${this.age} years old`);
};

// Virtual Property
catSchema.virtual('info').get(function () {
  return `My name is ${this.name} and my age is ${this.age}!`;
});

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
