import ReservationManager from "../mangers/ReservationManager.js";

export default class ReservationController {
  constructor(database) {
    this.reservationManager = new ReservationManager(database);
  }

  async getReservations(req, res) {
    try {
      const result = await this.reservationManager.getAllReservations();
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async getUserReservations(req, res) {
    try {
      const { userId } = req.params;
      const { perPage, offset } = req.query;
      const result = await this.reservationManager.getUserReservations(
        userId,
        perPage,
        offset
      );
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async getUserReservationsHistory(req, res) {
    try {
      const { userId } = req.params;
      const { perPage, offset } = req.query;
      const result = await this.reservationManager.getUserReservationsHistory(
        userId,
        perPage,
        offset
      );
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async getMentorReservations(req, res) {
    try {
      const { perPage, offset } = req.query;
      const { userId } = req.params;
      const result = await this.reservationManager.getMentorReservations(
        userId,
        perPage,
        offset
      );
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async getMentorReservationsHistory(req, res) {
    try {
      const { perPage, offset } = req.query;
      const { userId } = req.params;
      const result = await this.reservationManager.getMentorReservationsHistory(
        userId,
        perPage,
        offset
      );
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  //   async addUserSkill(req, res) {
  //   try {
  //     const { userId } = req.params;
  //     const { skillId } = req.body;

  //     const result = await this.skillsManager.addUserSkill(userId, skillId);
  //     res.json(result);
  //   } catch (error) {
  //     console.error(error.message);
  //     res
  //       .status(500)
  //       .json({ success: false, message: "Internal Server Error" });
  //   }
  // }

  async deletereservation(req, res) {
    try {
      const { reservationId } = req.params;
      const result = await this.reservationManager.deleteReservation(
        reservationId
      );
      res.json(result);
    } catch (error) {
      console.error("Error deleting skill:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async deleteMentorReservation(req, res) {
    try {
      const { reservationId, userId } = req.params;
      const result = await this.reservationManager.deleteMentorReservation(
        reservationId,
        userId
      );
      res.json(result);
    } catch (error) {
      console.error("Error deleting skill:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async addReservation(req, res) {
    try {
      const { subject, message, slotId, userId } = req.body;
      const result = await this.reservationManager.addReservation(
        subject,
        message,
        slotId,
        userId
      );
      res.json(result);
    } catch (error) {
      console.error("Error adding reservation:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async updateReservation(req, res) {
    try {
      const { reservationId } = req.params;
      const prop = req.body;
      const result = await this.reservationManager.updateReservationNote(
        reservationId,
        prop
      );
      res.json(result);
    } catch (error) {
      console.error("Error updating skill:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  //   async deleteSkill(req, res) {
  //     try {
  //       const { skillId } = req.params;
  //       const result = await this.skillsManager.deleteSkill(skillId);
  //       res.json(result);
  //     } catch (error) {
  //       console.error("Error deleting skill:", error);
  //       res
  //         .status(500)
  //         .json({ success: false, message: "Internal Server Error" });
  //     }
  //   }

  //   async updateSkill(req, res) {
  //     try {
  //       const { skillId } = req.params;
  //       const { name } = req.body;
  //       const result = await this.skillsManager.updateSkill(skillId, name);
  //       res.json(result);
  //     } catch (error) {
  //       console.error("Error updating skill:", error);
  //       res
  //         .status(500)
  //         .json({ success: false, message: "Internal Server Error" });
  //     }
  //   }
}
