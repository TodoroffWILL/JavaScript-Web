const router = require('express').Router();
const gameManager = require('../manager/gameManager');

const { getErrorMessage } = require('../utils/errorHelpers');
const { getDifficultyOptionsViewData } = require('../utils/viewHelpers');

router.route('/details/:id').get(async (req, res) => {
  const gameId = req.params.id;
  const game = await gameManager.getById(gameId).lean(); // Leaned
  const gameNotLeaned = await gameManager.getById(gameId); // Not leaned

  const isOwner = req.user?._id == game.owner._id.toString(); // with to string we don't have to populate it anymore.
  // Стигнахме до дали usera e логнат.

  res.locals.hasBought = false;
  if (gameNotLeaned.boughtBy.includes(req.user?._id)) {
    res.locals.hasBought = true;
  }
  res.render('details', { game, isOwner });
});

router
  .route('/details/:id/edit')
  .get(async (req, res) => {
    const id = req.params.id;
    try {
      const game = await gameManager.getById(id).lean();
      const options = getDifficultyOptionsViewData(game.platform);

      res.render('edit', { game, options: options.options });
    } catch (err) {
      res.redirect(`/details/${id}/edit`, { error: getErrorMessage(err) });
    }
  })
  .post(async (req, res) => {
    const id = req.params.id;
    const gameData = req.body;

    try {
      await gameManager.update(id, gameData);
      res.redirect(`/details/${id}`);
    } catch (err) {
      res.render(`edit`, { error: getErrorMessage(err), ...gameData });
    }
  });

router.get('/details/:id/delete', async (req, res) => {
  const id = req.params.id;

  try {
    await gameManager.delete(id);
    res.redirect('/catalog');
  } catch (err) {
    res.redirect(`/details/${id}`, { error: getErrorMessage(err) });
  }
});

router.get('/details/:id/buy', async (req, res) => {
  const gameId = req.params.id;
  const userId = req.user._id;

  res.locals.isBought = false;
  try {
    const game = await gameManager.getById(gameId);

    if (game.boughtBy.includes(userId)) {
      res.locals.isBought = true;
    }
    game.boughtBy.push(userId);
    await game.save();
  } catch (err) {
    console.error({ error: getErrorMessage(err) });
    res.render('404', { error: getErrorMessage(err) });
  }

  res.redirect(`/details/${gameId}`);
});

module.exports = router;
