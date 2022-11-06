import Router from "express";

import LevelController from "../controllers/LevelController.js";
const levelController = new LevelController();

const levelRoutes = Router();

levelRoutes
  .get("/getLevel", levelController.getLevel)
  .post("/createLevel", levelController.createLevel)
  .delete("/deleteLevel", levelController.deleteLevel);

export default levelRoutes;
