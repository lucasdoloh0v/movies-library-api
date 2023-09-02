const { hash } = require("bcryptjs");
const knex = require("../database/knex");
const { Errors } = require("../utils/errorHandling");

class UsersControllers {
  async create(req, res) {
    const { name, email, password } = req.body;

    const userExist = await knex("users").where({ email }).first();

    console.log(userExist);
    if (userExist) {
      throw new Errors("Este e-mail já está em uso", 500);
    }

    const hashedPassword = await hash(password, 8);

    const userRegistered = await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json();
  }
}

module.exports = UsersControllers;
