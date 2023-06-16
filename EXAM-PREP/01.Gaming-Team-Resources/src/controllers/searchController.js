const router = require('express').Router();
const gameManager = require('../manager/gameManager');
const { getGameBySearch } = require('../manager/gameManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router
  .route('/search')
  .get(async (req, res) => {
    const games = await gameManager.getAll().lean();

    res.render('search', { games });
  })
  .post(async (req, res) => {
    try {
      const { name, platform } = req.body;
      const foundGames = await getGameBySearch(name, platform);
      foundGames.search = name;
      foundGames.searchPlatform = platform;
      res.render('search', { foundGames });
    } catch (err) {
      console.error({ error: getErrorMessage(err) });
      res.redirect('/search');
    }
  });

module.exports = router;
