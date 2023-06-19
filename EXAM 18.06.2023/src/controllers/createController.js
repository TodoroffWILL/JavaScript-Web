const router = require('express').Router();
const animalManager = require('../manager/animalManager');

const { getErrorMessage } = require('../utils/errorHelpers');
const { isAuthz } = require('../middleware/authMiddleware');

router
  .route('/create')
  .get(isAuthz, (req, res) => {
    res.render('create');
  })
  .post(isAuthz, async (req, res) => {
    const animalData = req.body;
    console.log(animalData);
    const userId = req.user._id;
    try {
      await animalManager.create({
        ...animalData,
        owner: userId,
        date: new Date(),
      });
      res.redirect('/catalog');
    } catch (err) {
      res.render('create', { error: getErrorMessage(err) });
    }
  });

module.exports = router;
