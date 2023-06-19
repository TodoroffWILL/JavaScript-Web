const router = require('express').Router();
const animalManager = require('../manager/animalManager');

const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
  const limit = 3;
  try {
    const foundByDateAdded = await animalManager.findLastByDate(limit).lean();
    res.render('home', { foundByDateAdded });
  } catch (err) {
    res.render('home', { error: getErrorMessage(err) });
  }
});

router.get('/404', (req, res) => {
  res.render('404');
});
module.exports = router;

//Don't forget to go to routes.js
