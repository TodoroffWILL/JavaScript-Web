const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();

const readStream = fs.createReadStream('./input.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('./output.txt', { encoding: 'utf-8' });

readStream.pipe(gzip).pipe(writeStream); // Вид компресация на стреама
