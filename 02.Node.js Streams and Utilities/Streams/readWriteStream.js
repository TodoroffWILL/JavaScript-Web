const fs = require('fs');

// const path = require('path')
// Debugging wont work until the path is correct - can use "path" module
// Put path.resolve(__dirname,'input.txt') after the createReadStream
const readStream = fs.createReadStream('./input.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('./output.txt', { encoding: 'utf-8' });

// Прочита от readStream фаила и записва в writeStream фаила.
readStream.on('data', (chunk) => {
  writeStream.write(chunk);
});

// Когато няма повече за четене/приемане на данни от readStream,затвори и writeStreama
readStream.on('end', () => {
  writeStream.end();
});
