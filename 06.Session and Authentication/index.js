const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuid } = require('uuid'); // Unique ID's

const app = express();
const session = {};

app.use(cookieParser());

app.get('/', (req, res) => {
  let id;

  const userId = req.cookies['userId'];

  if (userId) {
    id = userId;
    console.log('User secret: ', session[userId].secret);
  } else {
    // res.header('Set-Cookie', `userId=${id}`); This is simplified below
    id = uuid();
    session[id] = {
      secret: 'my secret',
    };

    res.cookie('userId', id, { httpOnly: true }); // Sets the cookie to NOT be accesable through the document.cookie
  }

  res.send(`Hey im here: ${id}`);
});

app.listen(5000, () => console.log('Server is running on port:5000'));
