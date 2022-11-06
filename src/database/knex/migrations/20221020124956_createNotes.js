export const up = (knex) =>
  knex.schema.createTable("notes", (table) => {
    table.increments("id");

    table.text("title");
    table.text("description");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());

    table.integer("user_id").references("id").inTable("users");
  });

export const down = (knex) => knex.schema.dropTable("notes");
