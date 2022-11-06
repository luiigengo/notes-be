import knex from "../database/knex/knex.js";

export default class LevelController {
  async createLevel(req, res, next) {
    const { type, description } = req.body;

    try {
      if (type) {
        throw new Error("Type already registered");
      }

      await knex("levels").insert({ type, description });
      return res.json();
    } catch (err) {
      next(err);
    }
  }

  async deleteLevel(req, res, next) {
    const { id } = req.body;

    try {
      await knex("levels").delete().where({ id });
      return res.json();
    } catch (err) {
      next(err);
    }
  }

  async getLevel(req, res, next) {
    const { id } = req.body;

    try {
      const level = await knex("levels").where({ id });
      return res.json(level);
    } catch (err) {
      next(err);
    }
  }
}
