const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');

const { auth } = require('./middlewares/authMiddleware');

mongoose
  .connect('mongodb://127.0.0.1:27017/Furniture-Store')
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// With "npm i CORS" package
const cors = require('cors');
app.use(cors());
// Manually CORS origin
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', '*');
//   res.setHeader('Access-Control-Allow-Headers', '*');

//   next();
// });
app.use(auth);
app.use(routes);

app.get('/', (req, res) => {
  res.send('RESTful service');
});

app.listen(3030, () => console.log('RESTful server is running on PORT: 3030'));
