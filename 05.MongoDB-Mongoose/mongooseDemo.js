const mongoose = require('mongoose');
const baseUrl = 'mongodb://127.0.0.1:27017';

const Cat = require('./models/Cat');
const Person = require('./models/Person');

async function connectDb() {
  await mongoose.connect(baseUrl + '/myDataBase'); // Can create if doesn't exist or connect to existing db here

  // Read
  // .find() returns array with all elements inside
  // .findOne() returns the first one found .findOne({age:20}) returns the first one with age 20
  // .find({breed:"nenormalen"}) returns all the collections with this breed
  // .findById("the id if u know it")

  // Create method 1
  // const newCat = new Cat({
  //   name: 'Adelin',
  //   age: 10,
  //   breed: 'shiko',
  // });
  // await newCat.save(); // Without save it wont be saved in the databases

  // Create method 2
  // const newCat = await Cat.create({
  //   name: 'Adii',
  //   age: 33,
  //   breed: 'shimboto',
  // });

  // Update method 1 native mongoDB
  // await Cat.updateOne({ breed: 'shimboto' }, { $set: { age: 50 } });

  // Update method 2 Mongoose Way
  // await Cat.findByIdAndUpdate('6476340a4e903a7406ed654c', {
  //   $set: { age: 10 },
  // });

  // Delete method 1
  // await Cat.findByIdAndDelete('6476340a4e903a7406ed654c');

  // Find all non Doncho
  // const found = await Person.find({ name: { $ne: 'Doncho' } }); // Native MongoDB query
  // Method 2
  // const cats = await Cat.find().where('name').ne('Doncho')

  console.log(found);
}
connectDb();
