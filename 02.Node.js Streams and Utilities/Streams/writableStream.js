const fs = require('fs');

const writeStream = fs.createWriteStream('./output.txt', { encoding: 'utf-8' }); // It creates the file and puting it in the same folder and encoding it 'utf-8'!

// This put the data which the file will contain !
writeStream.write('Chunk 1');
writeStream.write('Chunk 2');
writeStream.write('Chunk 3');
writeStream.write('Chunk 4');

writeStream.end();
