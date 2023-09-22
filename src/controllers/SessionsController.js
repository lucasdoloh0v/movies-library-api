const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const knex = require('../database/knex');
const authConfig = require('../configs/auth');
const { Errors } = require('../utils/errorHandling');

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await knex('users').where({ email }).first();

    if (!user) {
      throw new Errors('E-mail ou senha incorreto', 401);
    }

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) {
      throw new Errors('E-mail ou senha incorreto', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return res.json({ token, user });
  }
}

module.exports = SessionsController;
