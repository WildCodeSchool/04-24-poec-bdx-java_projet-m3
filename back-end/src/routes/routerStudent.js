import express from "express";
import StudentController from "../controllers/StudentController.js";

const route = express.Router();

route.get("/students", StudentController.browse);
route.get("/students/:userId", StudentController.read);
route.post("/students", StudentController.add);
route.delete("/students/:studentId", StudentController.delete);
route.patch("/students", StudentController.update);

export default route;
