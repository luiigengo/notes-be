import jsonwebtoken from "jsonwebtoken";
import authConfig from "../configs/auth.js";

const { verify } = jsonwebtoken;

export function ensureAuthentication(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("JWT Invalido");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);
    req.user = {
      id: Number(user_id),
    };

    return next();
  } catch (err) {
    next(err);
  }
}
