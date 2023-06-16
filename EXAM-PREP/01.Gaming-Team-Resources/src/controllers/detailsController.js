const router = require('express').Router();
const gameManager = require('../manager/gameManager');

const { getErrorMessage } = require('../utils/errorHelpers');
const { getDifficultyOptionsViewData } = require('../utils/viewHelpers');

router.route('/details/:id').get(async (req, res) => {
  const gameId = req.params.id;
  const game = await gameManager.getById(gameId).lean();

  const isOwner = req.user?._id == game.owner._id.toString(); // with to string we don't have to populate it anymore.
  // Стигнахме до дали usera e логнат.

  res.render('details', { game, isOwner });
});

router
  .route('/details/:id/edit')
  .get(async (req, res) => {
    const id = req.params.id;
    try {
      const game = await gameManager.getById(id).lean();
      const options = getDifficultyOptionsViewData(game.platform);
      console.log(options);

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



module.exports = router;
