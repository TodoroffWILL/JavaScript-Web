const router = require('express').Router();
const gameManager = require('../manager/gameManager');

router
  .route('/catalog')
  .get(async (req, res) => {
    const games = await gameManager.getAll().lean();
    
    res.render('catalog', { games });
  })
  .post((req, res) => {});

module.exports = router;
