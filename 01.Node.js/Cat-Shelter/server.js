const express = require('express');
const server = express();
const handlebars = require('express-handlebars');
const bodyParser = express.urlencoded({ extended: false });
const fs = require('fs/promises');

// Add handlebars to express
server.engine('handlebars', handlebars.engine());
server.set('view engine', 'handlebars');

server.use(bodyParser);
server.use(express.static('content'));

server.get('/', (req, res) => {
  res.render('home');
});

server
  .route('/cats/add-breed')
  .get((req, res) => {
    res.render('addBreed');
  })
  .post((req, res) => {
    const data = { breeds: [] };

    // // fs.readFile('./data/breeds.json', 'utf8', (err, data) => {
    // //   if (err) {
    // //     console.error('Error reading file:', err);
    // //     return;
    // //   }

    // //   // File content is available in the 'data' variable
    // //   console.log('File content:', data);
    // });

    //     // we have a finle
    //     if (fsSyc.existsSync('./data/breeds.json')) {
    // console.log("File is there!")
    //      fs.readFile('./data/breeds.json', 'utf8', (err, data) => {
    //         if (err) {
    //           console.error(err);
    //           return;
    //         }
    //         console.log("reading file! ")

    //         let breed = JSON.stringify(req.body);

    //         let curretData = JSON.parse(data);

    //         curretData.breads.push(breed);
    //         console.log("writing to file! ")
    //         fs.writeFile('./data/breeds.json', curretData, 'utf-8', (err) => {
    //           if (err) {
    //             console.log('Unsuccessful file save!' + err);
    //             return;
    //           }
    //           console.log("writing to file! ")

    //         });
    //       });
    //     }
    //     // we don't have a fuck!
    //     else {

    //       let currentData = {breads:[]};
    //       let breed = JSON.stringify(req.body);
    //       currentData.push(breed)
    //       fs.writeFile('./data/breeds.json', currentData, 'utf-8', (err) => {
    //         if (err) {
    //           console.log('Unsuccessful file save!' + err);
    //           return;
    //         }
    //       });
    //     }
    res.redirect('/');
  });

server.get('/cats/add-cat', (req, res) => {
  res.render('addCat');
});

server.listen(5000, () => {
  'Working on port:5000';
});
