import knex from "../database/knex/knex.js";

export default class NoteController {
  async createNote(req, res, next) {
    const { title, description, tags, links } = req.body;
    const { user_id } = req.params;

    try {
      const note_id = await knex("notes").insert({
        title,
        description,
        user_id,
      });

      const linksInsert = links.map((link) => {
        return {
          note_id,
          url: link,
        };
      });

      await knex("links").insert(linksInsert);

      const tagsInsert = tags.map((name) => {
        return {
          note_id,
          name,
          user_id,
        };
      });

      await knex("tags").insert(tagsInsert);

      // await knex("notes").insert({ title, description });
      return res.json();
    } catch (err) {
      next(err);
    }
  }

  async getNote(req, res, next) {
    const { id } = req.params;
    try {
      const note = await knex("notes").where({ id }).first();
      const tags = await knex("tags").where({ note_id: id }).orderBy("name");
      const links = await knex("links")
        .where({ note_id: id })
        .orderBy("created_at");

      res.json({ ...note, links, tags });
    } catch (err) {
      next(err);
    }
  }

  async deleteNote(req, res, next) {
    const { id } = req.params;
    try {
      await knex("notes").where({ id }).delete();
      return res.json();
    } catch (err) {
      throw new Error(`No Notes with id ${id}`);
    }
  }

  async getUserNotes(req, res) {
    const { title, user_id, tags } = req.query;
    let userNotes;

    if (tags) {
      const filteredTags = tags.split(",").map((tag) => tag.trim());

      userNotes = await knex("tags")
        .select(["notes.id", "notes.title", "notes.user_id"])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filteredTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .groupBy("notes.id")
        .orderBy("notes.title");
    } else {
      userNotes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    return res.json(userNotes);
  }
}
