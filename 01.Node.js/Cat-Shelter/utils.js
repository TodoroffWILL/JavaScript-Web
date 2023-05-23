const fs = require('fs/promises');

const filePathBreeds = './data/breeds.json';
const filePathCats = './data/cats.json';
exports.getAndUpdateBreeds = async (req, res) => {
  const jsonData = await fs.readFile(filePathBreeds, 'utf-8', (err, data) => {
    if (err) {
      console.log('Cannot read file', err);
    }
  });
  let newData = JSON.parse(jsonData);
  newData.breeds.push(req.body.breed);
  const result = fs.writeFile(
    filePathBreeds,
    JSON.stringify(newData),
    'utf-8',
    (err) => {
      if (err) {
        console.log('FK YOU !');
      }
    }
  );
  return result;
};

exports.getAndUpdateCats = async (req, res) => {
  const jsonData = await fs.readFile(filePathCats, 'utf-8', (err, data) => {
    if (err) {
      console.log('Cannot read file', err);
    }
  });
  let newData = JSON.parse(jsonData);
  newData.breeds.push(req.body.breed);
  const result = fs.writeFile(
    filePathCats,
    JSON.stringify(newData),
    'utf-8',
    (err) => {
      if (err) {
        console.log('FK YOU !');
      }
    }
  );
  return result;
};
