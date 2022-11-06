import Router from "express";

import TagController from "../controllers/TagController.js";
const tagController = new TagController();

const tagRoutes = Router();

tagRoutes.get("/getTags/:user_id", tagController.getTags);
export default tagRoutes;
