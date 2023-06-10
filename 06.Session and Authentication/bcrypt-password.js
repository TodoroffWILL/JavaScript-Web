const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuid } = require('uuid'); // Unique ID's package
// bcrypt - hashing passwords
const bcrypt = require('bcrypt');
// Json Web Token
const jwt = require('jsonwebtoken');

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const payloads = { _id: uuid(), username: 'Doncho' };
  const options = { expiresIn: '2d' };
  const secret = 'MySuperPrivateSecret';

  const token = jwt.sign(payloads, secret, options);

  res.send(token);

  // let id;

  // const userId = req.cookies['userId'];

  // if (userId) {
  //   id = userId;
  // } else {
  //   // res.header('Set-Cookie', `userId=${id}`); This is simplified below
  //   id = uuid();

  //   res.cookie('userId', id, { httpOnly: true }); // Sets the cookie to NOT be accesable through the document.cookie
  // }

  // res.send(`Hey im here: ${id}`);
});

app.get('/login', (req, res) => {
  res.send(`<form method="POST">
  <label for="username">Username</label>
  <input type="text" name="username" />
  <label for="password">Password</label>
  <input type="password" name="password" />
  <input type="submit" value="Login" />
</form>
`);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // First making the salt "how hard the password to be salted. 10 rounds"
  const salt = await bcrypt.genSalt(10);
  // Than we generate the hash and we put inside the password and the salt generated.
  const hash = await bcrypt.hash(password, salt);

  res.send(hash);
});

app.listen(5000, () => console.log('Server is running on port:5000'));
