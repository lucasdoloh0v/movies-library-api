const { hash, compare } = require("bcryptjs");
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

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email, password, old_password: oldPassword } = req.body;
    const { id } = req.params;

    const user = await knex("users").where({ id }).first();

    if (!user) {
      throw new Errors("Usuario não encontrado", 404);
    }

    const userWithEmailToUpdate = await knex("users").where({ email }).first();

    if (userWithEmailToUpdate && userWithEmailToUpdate.id !== user.id) {
      throw new Errors("Este e-mail já está em uso");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !oldPassword) {
      throw new Errors(
        "Você precisa informar a senha antiga para definir a nova senha"
      );
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);

      if (!checkOldPassword) {
        throw new Errors("A senha antiga não confere");
      }

      user.password = await hash(password, 8);
    }

    await knex("users")
      .update({ ...user })
      .where({ id });

    return res.status(201).json();
  }
}

module.exports = UsersControllers;
