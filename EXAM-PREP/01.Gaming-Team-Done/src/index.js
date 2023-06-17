const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { auth } = require('./middleware/authMiddleware');

const mainRouter = require('./routes');
const app = express();

//3.Setting mongooseDB and don't forget to change the name of the DB
mongoose
  .connect('mongodb://127.0.0.1:27017/Games-COD')
  .then(() => {
    console.log('MongoDB connected successfully !');
  })
  .catch((err) => console.log('DB Error: ', err.message));

//2. Setting up the HANDLEBARS engine
app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', 'src/views');
//1. Setting up the BODYPARSER and the PUBLIC FOLDER for the CSS,IMG files
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth); // After cookies cause we cant use it
app.use(mainRouter);

app.listen(3000, () => console.log('Server is running on PORT: 3000'));
