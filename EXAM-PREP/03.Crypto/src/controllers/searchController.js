const router = require('express').Router();
const cryptoManager = require('../manager/cryptoManager');

router
  .route('/search')
  .get(async (req, res) => {
    const cryptos = await cryptoManager.getAll().lean();

    res.render('search', { cryptos });
  })
  .post(async (req, res) => {
    const { name, platform } = req.body;

    const found = await cryptoManager.getGameBySearch(
      name.toLowerCase(),
      platform
    );

    res.render('search', { found });
  });

module.exports = router;
