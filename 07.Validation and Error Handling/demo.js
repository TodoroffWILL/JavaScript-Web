const express = require('express');
const validator = require('validator');
const app = express();

const { isAgeValid } = require('./utils/inputValidations');
const { validateName } = require('./middlewares/validateName');


app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`<form action="" method="POST">
<label for="name">Name</label>
<input type="text" name="name" id="name" />

<label for="age">Age</label>
<input type="number" name="age" id="age" />
<label for="password">Password</label>
<input type="password" name="password" id="password"/>
<input type="submit" value="Create"/>
</form>`);
});

app.post('/', validateName, (req, res) => {
  const { name, age, password } = req.body;
  //Basic validating when we get the data
  if (!isAgeValid(age)) {
    return res.send('Invalid age');
  }
  if (!validator.isStrongPassword(password)) {
    return res.send('Not strong enough');
  }
  console.log(name, age);
  res.send('Successfull');
});

app.listen(3000, () => {
  'Working on port:3000';
});
