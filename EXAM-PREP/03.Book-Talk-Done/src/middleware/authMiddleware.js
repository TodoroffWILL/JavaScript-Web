const jwt = require('../lib/jwt');
const { SECRET } = require('../config/secret');

exports.auth = async (req, res, next) => {
  const token = req.cookies['token'];

  if (token) {
    try {
      const decodedToken = await jwt.verify(token, SECRET);
      req.user = decodedToken;

      res.locals.user = decodedToken;
      res.locals.isAuthenticated = true;

      next();
    } catch (err) {
      res.clearCookie('token');
      res.redirect('/login');
    }
  } else {
    next();
  }
};

// DON'T Forget to put the guard on the needed paths
exports.isAuthz = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  next();
};
