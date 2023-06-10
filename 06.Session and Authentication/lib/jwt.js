const util = require('util');
const jwt = require('jsonwebtoken');

// Here we are turning the jwt to asynchronous with the util package

const jwtPromises = {
  sign: util.promisify(jwt.sign),
  verify: util.promisify(jwt.verify),
};

module.exports = jwtPromises;
