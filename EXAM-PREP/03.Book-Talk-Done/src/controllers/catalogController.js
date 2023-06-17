const router = require('express').Router();
const bookManager = require('../manager/bookManager');

router.route('/catalog').get(async (req, res) => {
  const books = await bookManager.getAll().lean();

  res.render('catalog', { books });
});

module.exports = router;
