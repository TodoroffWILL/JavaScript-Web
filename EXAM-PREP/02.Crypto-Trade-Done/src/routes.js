const router = require('express').Router();
// Controllers
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const createController = require('./controllers/createController');
const catalogController = require('./controllers/catalogController');
const detailsController = require('./controllers/detailsController');
const searchController = require('./controllers/searchController');

// TODO add controller routes
router.use(homeController);
router.use(userController);
router.use(createController);
router.use(catalogController);
router.use(detailsController);
router.use(searchController);

router.get('*', (req, res) => {
  res.redirect('/404');
});

module.exports = router;
