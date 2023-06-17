const router = require('express').Router();
const cryptoManager = require('../manager/cryptoManager');

router.route('/catalog').get(async (req, res) => {
  const cryptos = await cryptoManager.getAll().lean();

  res.render('catalog', { cryptos });
});

module.exports = router;
