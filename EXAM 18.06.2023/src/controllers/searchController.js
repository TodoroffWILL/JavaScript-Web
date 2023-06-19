const router = require('express').Router();
const animalManager = require('../manager/animalManager');

const { getErrorMessage } = require('../utils/errorHelpers');
const { isAuthz } = require('../middleware/authMiddleware');

router
  .route('/search')
  .get(async (req, res) => {
    try {
      const animals = await animalManager.getAll().lean();
      res.render('search', { animals });
    } catch (err) {
      res.render('search', { error: getErrorMessage(err) });
    }
  })
  .post(async (req, res) => {
    const { location } = req.body;

    try {
      const foundAnimals = await animalManager.findAnimalByLocation(
        location.toLowerCase()
      );
      res.render('search', { foundAnimals });
    } catch (err) {
      res.render('search', { error: getErrorMessage(err) });
    }
  });

module.exports = router;
