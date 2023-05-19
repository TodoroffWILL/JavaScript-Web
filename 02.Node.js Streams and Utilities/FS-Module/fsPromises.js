const fs = require('fs/promises');


// 1.Прочита(readFile) от фаила "./input.txt" и връща promise
// 2.Resolving the promise
// 3.Върни(return) и запиши (writeFile) в нов файл с резултата от 2.
const data = async () => {
  const result = await fs.readFile('./input.txt', 'utf-8');

  return fs.writeFile('./output.txt', result, 'utf-8');
};

data();
