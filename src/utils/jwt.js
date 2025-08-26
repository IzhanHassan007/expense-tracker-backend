const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/env');

function signJwt(user) {
  return jwt.sign({ email: user.email }, jwtSecret, {
    subject: String(user._id),
    expiresIn: jwtExpiresIn,
  });
}

module.exports = { signJwt };

