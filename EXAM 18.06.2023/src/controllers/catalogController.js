const router = require('express').Router();
const animalManager = require('../manager/animalManager');

const { getErrorMessage } = require('../utils/errorHelpers');

router.route('/catalog').get(async (req, res) => {
  try {
    const animals = await animalManager.getAll().lean(); // Change manager
    res.render('dashboard', { animals });
  } catch (err) {
    res.render('dashboard', { error: getErrorMessage(err) });
  }
});

module.exports = router;
