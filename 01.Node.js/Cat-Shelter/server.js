const express = require('express');
const server = express();
const handlebars = require('express-handlebars');
const bodyParser = express.urlencoded({ extended: false });
const { getAndUpdateBreeds, getAndUpdateCats } = require('./utils');
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
  .post(async (req, res) => {
    getAndUpdateCats(req, res);
    // Check if the file exists
    res.redirect('/');
  });

server
  .route('/cats/add-cat')
  .get((req, res) => {
    res.render('addCat');
  })
  .post(async (req, res) => {});
server.listen(5000, () => {
  'Working on port:5000';
});
