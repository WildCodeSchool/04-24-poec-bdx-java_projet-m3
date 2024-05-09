import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import route from "./routes/router.js";
import path from "path";
import { fileURLToPath } from "url";
import routerSkill from "./routes/routerSkill.js";
import routerLanguage from "./routes/routerLanguage.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const reactBuildPath = path.join(__dirname, "/../../front-end/dist");

app.use(express.static(reactBuildPath));

app.use("/", route);
app.use("/skill", routerSkill);
app.use("/language", routerLanguage);
app.get(
  "*.*",
  express.static(path.join(__dirname, "../public"), { maxAge: "1y" })
  // (req, res) => {
  //   res.sendFile(`${reactBuildPath}/index.html`);
  // }
);

export default app;
