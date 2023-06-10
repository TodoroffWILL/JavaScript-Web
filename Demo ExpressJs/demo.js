const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // res.download('demo.js'); // Sending to the user file to download or whatever

  res.render('index'); // By default its gonna look files in a folder "VIEWS"
});

const userRouter = require('./routes/users');

app.use('/users', userRouter); // Use anything that starts with /users to use that router

app.listen(5000, () => {
  console.log('ExpressJS demo is running');
});
