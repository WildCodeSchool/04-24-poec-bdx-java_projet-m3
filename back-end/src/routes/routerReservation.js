import express from "express";
import { client } from "../clientDb/client.js";
import ReservationController from "../controllers/ReservationController.js";

const router = express.Router();

const reservationController = new ReservationController(client);
router.get("/reservations", (req, res) => {
  reservationController.getReservations(req, res);
});

router.get("/reservations/user/:userId", (req, res) => {
  reservationController.getUserReservations(req, res);
});

router.get("/reservations/mentor/:mentorId", (req, res) => {
  reservationController.getMentorReservations(req, res);
});

router.delete("/reservations/:reservationId", (req, res) => {
  reservationController.deletereservation(req, res);
});

router.post("/reservations", (req, res) => {
  reservationController.addReservation(req, res);
});

router.put("/reservations/:reservationId", (req, res) => {
  reservationController.updateReservation(req, res);
});

export default router;
