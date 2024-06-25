import express from "express";
import SkillsController from "../controllers/SkillController.js";
import { client } from "../clientDb/client.js";

const router = express.Router();

const skillsController = new SkillsController(client);
router.get("/skills", (req, res) => {
  skillsController.getSkills(req, res);
});

router.get("/skills/user/:id", (req, res) => {
  skillsController.getUsersSkills(req, res);
});

router.post("/skills", (req, res) => {
  skillsController.addSkill(req, res);
});

router.post("/skills/user/:userId", (req, res) => {
  skillsController.editSkillsList(req, res);
});

router.delete("/skills/:skillId", (req, res) => {
  skillsController.deleteSkill(req, res);
});

router.put("/skills/:skillId", (req, res) => {
  skillsController.updateSkill(req, res);
});

export default router;
