const express = require('express');
const router = express.Router();
// It works just like the app but separating the requests

router.get('/', (req, res) => {
  res.send('User List');
});

router.get('/new', (req, res) => {
  res.send('User List');
});

router.post('/', (req, res) => {
  res.send('Create User');
});

router // This is how we chain routes. So we give the route and chaining the rest of them.
  .route('/:id')
  .get((req, res) => {
    console.log(req.user);
    const id = req.params.id;
    res.send(`Get user with id ${id}`);
  })
  .put((req, res) => {
    const id = req.params.id;
    res.send(`Get user with id ${id}`);
  })
  .delete((req, res) => {
    const id = req.params.id;
    res.send(`Get user with id ${id}`);
  });

const users = [{ name: 'Kyle' }, { name: 'Sally' }];

router.param('id', (req, res, next, id) => {
  req.user = users[id];
  next();
});

module.exports = router;
