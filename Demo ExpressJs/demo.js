const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true })); // Here we can access the body from req.
app.set('view engine', 'ejs');
// app.use(logger); // Here we using the middleware. Use it on top of the page always or if we don't wanna use it everywhere we can pass it into the route we want to.

app.get('/', logger, (req, res) => {
  // res.download('demo.js'); // Sending to the user file to download or whatever

  res.render('index'); // By default its gonna look files in a folder "VIEWS"
});

const userRouter = require('./routes/users');

app.use('/users', userRouter); // Use anything that starts with /users to use that router

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

app.listen(5000, () => {
  console.log('ExpressJS demo is running');
});
