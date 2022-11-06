import express from "express";
import routes from "./routes/routes.js";

import uploadConfig from "./configs/upload.js";

import sqliteConnection from "./database/sqlite/sqlite.js";

import cors from "cors";

const app = express();

app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));

app.use(cors());

app.use(express.json());
app.use(routes);

sqliteConnection();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Port ${PORT} running`);
});
