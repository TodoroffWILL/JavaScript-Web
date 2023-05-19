const fs = require('fs');
const { text } = require('stream/consumers');

const data = 'Az shte UCHA I SHTE USPEQ MAMKA MU';

//1.Path - and extension of the file
//2.Data - which you wanna write to the file
//3.Utf-8
//4.Callback

fs.writeFile('./output.txt', data, 'utf-8', (err) => {
  if (err) {
    console.log('Unsuccessful file save!');
    return;
  }
  console.log('Successfully saved file');
});
