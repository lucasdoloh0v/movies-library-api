const { verify } = require('jsonwebtoken');

const { Errors } = require('../utils/errorHandling');
const { jwt } = require('../configs/auth');

function ensureAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Errors('undefined token');
  }

  const [, token] = authorization.split(' ');

  try {
    const { sub } = verify(token, jwt.secret);

    req.user = {
      id: Number(sub),
    };

    return next();
  } catch {
    throw new Errors('invalid token');
  }
}

module.exports = ensureAuthenticated;
