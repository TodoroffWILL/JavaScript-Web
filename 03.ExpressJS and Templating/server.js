const express = require('express');
const server = express();
const path = require('path');
const handlebars = require('express-handlebars');
// Add handlebars to express !
server.engine('hbs', handlebars.engine({ extname: 'hbs' }));
server.set('view engine', 'hbs'); // Set view engine-a da e raven na 'handlebars' it looks for the folder "views" in the root folder

//Add third party middleware - this is how we get the formData and getting easily from the input fields
const bodyParser = express.urlencoded({ extended: false });
server.use(bodyParser);

server.use(express.static('public')); // Коя е директорията в която да търси статични файлове в Public папката като цсс-а

//Add middlewares - be careful of the line where they are.
// If they are on the top of the code they become global.
server.use((req, res, next) => {
  console.log(`HTTP Request ${req.method}: ${req.path}`);
  next();
});
server.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});
// Partial based middleware - ако имаш път с '/cats' мини през middleware
server.use('/cats/:catID', (req, res, next) => {
  console.log('Cats middleware');
  next();
});
// Route specific middleware
server.get(
  '/specific',
  (req, res, next) => {
    console.log('Specific middleware only for this route');
    next();
  },
  (req, res) => {
    res.send('Some specific route with middleware');
  }
);

// Express Router/Actions below !

// The callback after the server.get('/',()=>{}) is called "ACTION" which means: When you go there do this."
server.get('/', (req, res) => {
  // All this is equvalent to res.send();
  //   res.writeHead(200, {
  //     'content-type': 'application/json',
  //   });
  //   res.write('Hello from Express!');
  //   res.end();
  // Automatically recognizing the type of data send,write it and ending it.

  res.render('home'); // Подава се името на "view-to v handlebar", изисква по default Layout-маин теплейт който не се променя
});

server.get('/about', (req, res) => {
  res.render('about');
});

server.get('/cats', (req, res) => {
  res.status(200).send(`
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/style.css">
    <title>Document</title>
</head>
<body>
  <form method="post">  
  <label for ="name">Name</label>
  <input type="text" id="name" name="name"></input>
  <label for ="age">Age</label>
  <input type="number" id="age" name="age"></input>
  <input type="submit" value="Create"></input>
  </form>
  </body>
</html>`);
});

server.post('/cats', (req, res) => {
  console.log(req.body);
  res.status(201).send('Cat has beed created!');
});

// This is how we get the cat by its ID with the params. Which is /cats/2 with the validation if its Number
server.get('/cats/:catID', (req, res) => {
  const catID = Number(req.params.catID);
  if (!catID) return res.status(404).send('Cannot find a cat');

  console.log(req.params);
  res.send(`Request with parameter - ${req.params.catID}`);
});

// You give the path so when the user clicks the file can be downloaded
server.get('/download', (req, res) => {
  //   res.download('./book.pdf'); It downloads the file when you go to /download and automatically puts end()
  //   res.attachment('./book.pdf');
  //   res.end(); attachment needs end() so you can add more things in the response !

  // This means that the user is opening the file in the browser. It doesn't download it.
  res.sendFile(path.resolve(__dirname, './book.pdf'));
});
// Returns response (302) and it redirects to the path we want to redirect !
server.get('/old-route', (req, res) => {
  res.redirect('/cats');
});
// If doesn't find anything of the above paths/methods it returns what i put to. * means first one that doesn't meet the requirements
server.get('*', (req, res) => {
  res.status(404).send('Page not Found');
});

// End of Router

server.listen('5000', () => {
  console.log('Server is listening on port 5000!');
});
