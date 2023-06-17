const router = require('express').Router();
const bookManager = require('../manager/bookManager');

const { getErrorMessage, } = require('../utils/errorHelpers');
const { isAuthz } = require('../middleware/authMiddleware');

router.get('/profile', isAuthz, async (req, res) => {
  try {
    const userWishedBooks = await bookManager
      .getAllWishedByUserId(req.user._id)
      .lean();
    const wished = await bookManager.wishedBooksByUserId(req.user._id).lean();

    res.render('profile', { userWishedBooks, wished });
  } catch (err) {
    console.error(getErrorMessage(err));
    res.redirect('/');
  }
});

module.exports = router;
