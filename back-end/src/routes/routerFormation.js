import express from "express";
import FormationController from "../controllers/FormationController.js";

const router = express.Router();

router.get("/formations", (req, res) => {
  FormationController.getAllFormations(req, res);
});

router.get("/formations/user/:userId", (req, res) => {
  FormationController.getUserFormations(req, res);
});

router.post("/formations", (req, res) => {
  FormationController.add(req, res);
});

router.delete("/formations/:formationId/:userId", (req, res) => {
  FormationController.delete(req, res);
});

router.put("/formations/:formationId", (req, res) => {
  FormationController.update(req, res);
});

export default router;
