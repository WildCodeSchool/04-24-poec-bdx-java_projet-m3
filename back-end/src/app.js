import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import route from "./routes/router.js";
import path from "path";
import { fileURLToPath } from "url";
import routerSkill from "./routes/routerSkill.js";
import routerLanguage from "./routes/routerLanguage.js";
import routerMentor from "./routes/routerMentor.js";
import routerStudent from "./routes/routerStudent.js";
import routerFormation from "./routes/routerFormation.js";
import routerExperience from "./routes/routerExperience.js";
import routerReservation from "./routes/routerReservation.js";
import routerFavorite from "./routes/routerFavorite.js";
import routerSlot from "./routes/routerSlot.js";

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
app.use("/mentor", routerMentor);
app.use("/student", routerStudent);
app.use("/language", routerLanguage);
app.use("/formation", routerFormation);
app.use("/reservation", routerReservation);
app.use("/experience", routerExperience);
app.use("/favorite", routerFavorite);
app.use("/slot", routerSlot);

app.get(
  "*.*",
  express.static(path.join(__dirname, "../public"), { maxAge: "1y" })
  // (req, res) => {
  //   res.sendFile(`${reactBuildPath}/index.html`);
  // }
);

export default app;
