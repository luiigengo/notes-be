import Router from "express";
import SessionsController from "../controllers/SessionsController.js";

const sessionsController = new SessionsController();

const sessionsRoutes = Router();

sessionsRoutes.post("/createSession", sessionsController.create);

export default sessionsRoutes;
