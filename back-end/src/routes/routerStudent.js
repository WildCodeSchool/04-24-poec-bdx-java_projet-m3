import express from "express";
import StudentController from "../controllers/StudentController.js";
import multer from "multer";
import renameFile from "../middlewares/multer.js";

const route = express.Router();

route.get("/students", StudentController.browse);
route.get("/students/:userId", StudentController.read);
route.post("/students", StudentController.add);
route.delete("/students/:studentId", StudentController.delete);
route.put("/students/:userId", StudentController.update);
const upload = multer({ dest: "./public/uploads/" });
route.put(
  "/students/image/:userId",
  upload.single("file"),
  renameFile,
  StudentController.updateImage
);

export default route;
