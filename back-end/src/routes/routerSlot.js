import express from "express";
import { client } from "../clientDb/client.js";
import SlotController from "../controllers/SlotController.js";

const router = express.Router();
const slotController = new SlotController(client);

router.post("/slots", (req, res) => {
  slotController.addSlot(req, res);
});

export default router;
