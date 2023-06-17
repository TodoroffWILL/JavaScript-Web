const router = require('express').Router();
const bookManager = require('../manager/bookManager');

const { getErrorMessage } = require('../utils/errorHelpers');
const { isAuthz } = require('../middleware/authMiddleware');

router
  .route('/create')
  .get((req, res) => {
    res.render('create');
  })
  .post(async (req, res) => {
    const bookData = req.body;
    const userId = req.user._id;
    try {
      await bookManager.create({ ...bookData, owner: userId });
      res.redirect('/catalog');
    } catch (err) {
      res.render('create', { error: getErrorMessage(err) });
    }
  });

module.exports = router;
