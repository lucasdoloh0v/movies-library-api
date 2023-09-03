const knex = require("../database/knex");
const { Errors } = require("../utils/errorHandling");

class MovieNotesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body;
    const { user_id } = req.params;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new Errors("Usuario não encontrado", 404);
    }

    if (rating < 0 || rating > 10) {
      throw new Errors("O rating deve ser um número de 1 à 10");
    }

    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    const tagsInsert = tags.map((name) => ({
      note_id,
      name,
      user_id,
    }));

    await knex("movie_tags").insert(tagsInsert);

    return res.status(201).json();
  }

  async readOne(req, res) {
    const { id } = req.params;

    const note = await knex("movie_notes").where({ id }).first();
    const movieTags = await knex("movie_tags")
      .where({ note_id: id })
      .orderBy("name");

    return res.status(200).json({ ...note, movieTags });
  }
}

module.exports = MovieNotesController;
