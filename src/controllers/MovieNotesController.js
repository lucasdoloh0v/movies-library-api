const knex = require('../database/knex');
const { Errors } = require('../utils/errorHandling');

class MovieNotesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body;
    const user_id = req.user.id;

    const user = await knex('users').where({ id: user_id }).first();

    if (!user) {
      throw new Errors('Usuario não encontrado', 404);
    }

    if (rating < 0 || rating > 10) {
      throw new Errors('O rating deve ser um número de 1 à 10');
    }

    const [note_id] = await knex('movie_notes').insert({
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

    await knex('movie_tags').insert(tagsInsert);

    return res.status(201).json();
  }

  async readOne(req, res) {
    const { id } = req.params;

    const note = await knex('movie_notes').where({ id }).first();

    if(!note) {
      throw new Errors("Not Found", 404)
    }
    
    const movieTags = await knex('movie_tags')
      .where({ note_id: id })
      .orderBy('name');

    return res.status(200).json({ ...note, movieTags });
  }

  async searchNotes(req, res) {
    const { title } = req.query;
    const { id: user_id } = req.user;

    if (!user_id) {
      throw new Errors('user_id precisa ser enviado na requisição');
    }

    let notes;

    if (!title) {
      notes = await knex('movie_notes').where({ user_id }).orderBy('title');
    } else {
      notes = await knex('movie_notes')
        .where({ user_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title');
    }

    const userTags = await knex('movie_tags').where({ user_id });
    const notesWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags,
      };
    });

    return res.status(200).json(notesWithTags);
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex('movie_notes').where({ id }).delete();

    return response.json();
  }
}

module.exports = MovieNotesController;
