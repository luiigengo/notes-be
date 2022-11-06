import knex from "../database/knex/knex.js";
import { DiskStorage } from "../providers/DiskStorage.js";

export default class UserAvatarController {
  async update(req, res, next) {
    const user_id = req.user.id;
    const avatarFileName = req.file.filename;

    const diskStorage = new DiskStorage();

    try {
      const user = await knex("users").where({ id: user_id }).first();

      if (!user) {
        throw new Error("Only authenticated users can update avatar");
      }

      if (user.avatar) {
        await diskStorage.deleteFile(user.avatar);
      }

      const filename = await diskStorage.saveFile(avatarFileName);
      user.avatar = filename;

      await knex("users").update(user).where({ id: user_id });

      return res.json(user);
    } catch (err) {
      next(err);
    }
  }
}
