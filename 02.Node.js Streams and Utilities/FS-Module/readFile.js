const fs = require('fs');

fs.readFile('./input.txt', { encoding: 'utf-8' }, (err, textFromTheFile) => {
  // Always the first param that this callback accepts is err ! Than the data from the file!
  if (err) {
    console.log(err);
    return;
  }
  console.log(`When you load the file print this: ${textFromTheFile}`);
});

console.log('end');
