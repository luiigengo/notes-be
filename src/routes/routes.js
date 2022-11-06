import Router from "express";

import levelRoutes from "./levelRoutes.js";
import userRoutes from "./userRoutes.js";
import sessionsRoutes from "./sessionsRoutes.js";
import noteRoutes from "./noteRoutes.js";
import tagRoutes from "./tagRoutes.js";

const routes = Router();
routes.use("/users", userRoutes);
routes.use("/levels", levelRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/notes", noteRoutes);
routes.use("/tags", tagRoutes);

export default routes;
