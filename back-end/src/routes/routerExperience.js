import express from "express";
import ExperienceController from "../controllers/ExperienceController.js";
const router = express.Router();

router.get("/experiences", (req, res) => {
  ExperienceController.getAllExperiences(req, res);
});

router.get("/experiences/user/:userId", (req, res) => {
  ExperienceController.getUserExperiences(req, res);
});

router.post("/experiences", (req, res) => {
  ExperienceController.add(req, res);
});

router.delete("/experiences/:experienceId/:userId", (req, res) => {
  ExperienceController.delete(req, res);
});

router.put("/experiences/:experienceId", (req, res) => {
  ExperienceController.update(req, res);
});

export default router;
