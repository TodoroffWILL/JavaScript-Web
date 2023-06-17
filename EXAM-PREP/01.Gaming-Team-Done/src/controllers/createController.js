const router = require('express').Router();
const gameManager = require('../manager/gameManager');

const { getErrorMessage } = require('../utils/errorHelpers');

router
  .route('/create')
  .get((req, res) => {
    res.render('create');
  })
  .post(async (req, res) => {
    const gameData = { ...req.body, owner: req.user._id };

    try {
      await gameManager.create(gameData);
      res.redirect('catalog');
    } catch (err) {
      res.render('create', { error: getErrorMessage(err) });
    }
  });

module.exports = router;
