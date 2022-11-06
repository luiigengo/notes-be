export const up = (knex) =>
  knex.schema.createTable("levels", (table) => {
    table.increments("id");
    table.text("type");
    table.text("description");
  });

export const down = (knex) => knex.schema.dropTable("levels");
