const router = require('express').Router();
const cryptoManager = require('../manager/cryptoManager');

const { getErrorMessage } = require('../utils/errorHelpers');
const { getDifficultyOptionsViewData } = require('../utils/viewHelpers');
const { isAuthz } = require('../middleware/authMiddleware');

router.route('/details/:id').get(async (req, res) => {
  const cryptoId = req.params.id;
  const crypto = await cryptoManager.getById(cryptoId).lean();
  const cryptoIsBought = await cryptoManager.getById(cryptoId);

  const isOwner = req.user?._id == crypto.owner._id;

  res.locals.isBought = false;
  if (cryptoIsBought.boughtBy.includes(req.user?._id)) {
    res.locals.isBought = true;
  }

  console.log(res.locals.isBought);

  res.render('details', { crypto, isOwner });
});

router
  .route('/details/:id/edit')
  .get(isAuthz, async (req, res) => {
    const cryptoId = req.params.id;
    try {
      const crypto = await cryptoManager.getById(cryptoId).lean();
      const options = getDifficultyOptionsViewData(crypto.platform);
      res.render('edit', { crypto, options });
    } catch (err) {
      res.render('edit', {
        error: getErrorMessage(err),
      });
    }
  })
  .post(isAuthz, async (req, res) => {
    const cryptoId = req.params.id;
    const cryptoData = req.body;
    try {
      await cryptoManager.update(cryptoId, cryptoData);
      res.redirect(`/details/${cryptoId}`);
    } catch (err) {
      res.render(`edit`, { error: getErrorMessage(err) });
    }
  });

router.get('/details/:id/delete', isAuthz, async (req, res) => {
  const cryptoId = req.params.id;

  try {
    await cryptoManager.delete(cryptoId);
    res.redirect(`/catalog`);
  } catch (err) {
    res.render('details', { error: 'Unable to delete crypto' });
  }
});

router.get('/details/:id/buy', isAuthz, async (req, res) => {
  const cryptoId = req.params.id;
  const userId = req.user._id;
  try {
    const crypto = await cryptoManager.getById(cryptoId);
    crypto.boughtBy.push(userId);
    crypto.save();
    res.redirect(`/details/${cryptoId}`);
  } catch (err) {
    res.redirect(`/details/${cryptoId}`, { error: getErrorMessage(err) });
  }
});

module.exports = router;
