import express from "express";
import MentorController from "../controllers/MentorController.js";

const route = express.Router();

route.get("/mentors", MentorController.browse);
route.get("/mentors/:userId", MentorController.read);
route.post("/mentors", MentorController.add);
route.delete("/mentors/:mentorId", MentorController.delete);
route.patch("/mentors", MentorController.update);

export default route;
