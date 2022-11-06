import knex from "../database/knex/knex.js";
import bcrypt from "bcryptjs";
import authConfig from "../configs/auth.js";
import jsonwebtoken from "jsonwebtoken";

export default class SessionController {
  async create(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await knex("users").where({ email }).first();

      if (!user) {
        throw new Error("Email e/ou senha incorretos");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Email e/ou senha incorretos");
      }

      const { sign } = jsonwebtoken;
      const { secret, expiresIn } = authConfig.jwt;
      const token = sign({}, secret, {
        subject: String(user.id),
        expiresIn,
      });

      return res.json({ user, token });
    } catch (err) {
      next(err);
    }
  }
}
