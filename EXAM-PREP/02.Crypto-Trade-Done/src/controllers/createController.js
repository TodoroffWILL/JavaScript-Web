const router = require('express').Router();
const cryptoManager = require('../manager/cryptoManager');

const { getErrorMessage } = require('../utils/errorHelpers');
const { isAuthz } = require('../middleware/authMiddleware');

router
  .route('/create')
  .get((req, res) => {
    res.render('create');
  })
  .post(isAuthz, async (req, res) => {
    const cryptoData = { ...req.body, owner: req.user._id };

    try {
      await cryptoManager.create(cryptoData);
      res.redirect('catalog');
      // res.send('CREATED !');
    } catch (err) {
      res.render('create', { error: getErrorMessage(err) });
    }
  });

module.exports = router;
