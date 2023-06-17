const router = require('express').Router();
const userManager = require('../manager/userManager');
const { getErrorMessage } = require('../utils/errorHelpers');

// Register router
router
  .route('/register')
  .get((req, res) => {
    res.render('users/register');
  })
  .post(async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;
    try {
      const token = await userManager.register({
        username,
        email,
        password,
        repeatPassword,
      });

      res.cookie('token', token);
      res.redirect('/');
    } catch (err) {
      res.render('users/register', { error: getErrorMessage(err) });
    }
  });

// Login router
router
  .route('/login')
  .get((req, res) => {
    res.render('users/login');
  })
  .post(async (req, res) => {
    // Email or Username don't forget to change !
    const { email, password } = req.body;

    try {
      const token = await userManager.login(email, password);

      res.cookie('token', token);
      res.redirect('/');
    } catch (err) {
      res.render('users/login', { error: getErrorMessage(err) });
    }
  });

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;
