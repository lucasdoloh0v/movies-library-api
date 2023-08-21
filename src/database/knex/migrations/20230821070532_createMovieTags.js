exports.up = (knex) =>
  knex.schema.createTable("movie_tags", (table) => {
    table.increments("id");
    table.integer("note_id").references("id").inTable("movie_notes");
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("movie_tags");
