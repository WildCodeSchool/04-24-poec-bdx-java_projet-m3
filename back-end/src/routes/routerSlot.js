import express from "express";
import { client } from "../clientDb/client.js";
import SlotController from "../controllers/SlotController.js";

const router = express.Router();
const slotController = new SlotController(client);

router.post("/slots", (req, res) => {
  slotController.addSlot(req, res);
});

router.get("/slots", (req, res) => {
  slotController.getSlots(req, res);
});

router.put("/slots/:slotId", (req, res) => {
  slotController.updateSlot(req, res);
});

router.delete("/slots/:id", (req, res) => {
  slotController.deleteSlot(req, res);
});
export default router;
