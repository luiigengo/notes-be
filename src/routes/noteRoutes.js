import Router from "express";

import NoteController from "../controllers/NoteController.js";
const noteController = new NoteController();

const noteRoutes = Router();

noteRoutes
  .get("/getNote/:id", noteController.getNote)
  .get("/getUserNotes", noteController.getUserNotes)
  .post("/createNote/:user_id", noteController.createNote)
  .delete("/deleteNote/:id", noteController.deleteNote);
export default noteRoutes;
