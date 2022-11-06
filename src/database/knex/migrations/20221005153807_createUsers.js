export const up = (knex) =>
  knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.text("name");
    table.text("email");
    table.text("password");
    table.integer("levelId").references("id").inTable("levels");
  });

export const down = (knex) => knex.schema.dropTable("users");
