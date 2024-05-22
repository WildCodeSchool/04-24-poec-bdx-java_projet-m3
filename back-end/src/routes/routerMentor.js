import express from "express";
import MentorController from "../controllers/MentorController.js";
import renameFile from "../middlewares/multer.js";
import multer from "multer";

const route = express.Router();

route.get("/mentors", MentorController.browse);
route.get("/mentors/:userId", MentorController.read);
route.post("/mentors", MentorController.add);
route.delete("/mentors/:mentorId", MentorController.delete);
route.put("/mentors/:userId", MentorController.update);
const upload = multer({ dest: "./public/uploads/" });
route.put(
  "/mentors/image/:userId",
  upload.single("file"),
  renameFile,
  MentorController.updateImage
);

export default route;
