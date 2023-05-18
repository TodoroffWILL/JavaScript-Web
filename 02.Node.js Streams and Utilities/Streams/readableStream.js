const fs = require('fs');

const readStream = fs.createReadStream('./input.txt', {
  highWaterMark: 10000, // How many Bites to be the chunk that's transfering
  encoding: 'utf-8', // To show the encoded numbers to text
});

// Starts reading the data on chunks
readStream.on('data', (chunk) => {
  console.log('Read Chunk');
  console.log(chunk);
});

// When the whole chunk of data is transfered do this:
readStream.on('end', () => {
  console.log('Reading data is finnished');
});
