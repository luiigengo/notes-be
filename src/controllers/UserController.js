import knex from "../database/knex/knex.js";
import bcrypt from "bcryptjs";

export default class UserController {
  async getUser(req, res, next) {
    const { id } = req.body;

    try {
      const user = await knex("users").where({ id }).first();

      if (!user) {
        throw new Error(`No users with id ${id}`);
      }

      return res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    const { name, email, password, levelId } = req.body;

    try {
      const checkEmailExist = await knex("users").where({ email }).first();
      if (checkEmailExist) {
        throw new Error("Email cadastrado");
      }

      const hashPassword = await bcrypt.hash(password, 8);

      await knex("users").insert({
        name,
        email,
        password: hashPassword,
        levelId,
      });
      return res.json();
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    const { name, email, password, oldPassword, levelId } = req.body;
    const user_id = req.user.id;
    try {
      const user = await knex("users").where({ id: user_id }).first();
      console.log(user_id);

      if (!user) {
        throw new Error(`No users with ID ${user_id}`);
      }

      const userWithUpdatedEmail = await knex("users").where({ email }).first();

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new Error("Email já está em uso");
      }

      user.name = name ?? user.name;
      user.email = email ?? user.email;

      if (password && !oldPassword) {
        throw new Error(
          "Você precisa informar a senha antiga para trocar de senha"
        );
      }

      if (password && oldPassword) {
        const checkedPassword = await bcrypt.compare(
          oldPassword,
          user.password
        );
        if (!checkedPassword) {
          throw new Error("Senha incorreta");
        }
        user.password = await bcrypt.hash(password, 8);
      }

      await knex("users")
        .where({ id: user_id })
        .update({ name, email, password: user.password });

      return res.json();
    } catch (err) {
      next(err);
    }
  }
}
