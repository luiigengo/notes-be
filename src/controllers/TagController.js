import knex from "../database/knex/knex.js";

export default class TagController {
  async getTags(req, res) {
    const { user_id } = req.params;
    const userIdNumber = Number(user_id);

    const userTags = await knex("tags")
      .where({ user_id: userIdNumber })
      .groupBy("name");
    return res.json(userTags);
  }
}
