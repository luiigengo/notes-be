import knex from "../database/knex/knex.js";

export default class UserRepository {
  async findByEmail(email) {
    const user = await knex("users").where({ email }).first();

    return user;
  }

  async createUser({ name, email, password, levelId }) {
    const userId = await knex("users").insert({
      name,
      email,
      password,
      levelId,
    });

    return { id: userId };
  }
}
