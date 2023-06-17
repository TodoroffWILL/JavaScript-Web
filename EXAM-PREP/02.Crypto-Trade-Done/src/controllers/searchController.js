const router = require('express').Router();
const cryptoManager = require('../manager/cryptoManager');

const { isAuthz } = require('../middleware/authMiddleware');

router
  .route('/search')
  .get(isAuthz, async (req, res) => {
    const cryptos = await cryptoManager.getAll().lean();

    res.render('search', { cryptos });
  })
  .post(isAuthz, async (req, res) => {
    const { name, platform } = req.body;

    const found = await cryptoManager.getGameBySearch(
      name.toLowerCase(),
      platform
    );

    res.render('search', { found });
  });

module.exports = router;
