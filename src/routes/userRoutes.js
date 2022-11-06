import Router from "express";
import UserController from "../controllers/UserController.js";
import UserAvatarController from "../controllers/UserAvatarController.js";

import multer from "multer";
import uploadConfig from "../configs/upload.js";

import { ensureAuthentication } from "../middleware/ensureAuthentication.js";

const userController = new UserController();
const userAvatarController = new UserAvatarController();

const userRoutes = Router();
const upload = multer(uploadConfig.MULTER);

userRoutes
  .get("/getUser", userController.getUser)
  .post("/createUser", userController.createUser)
  .put("/updateUser", ensureAuthentication, userController.updateUser)
  .patch(
    "/avatar",
    ensureAuthentication,
    upload.single("avatar"),
    userAvatarController.update
  );

export default userRoutes;
