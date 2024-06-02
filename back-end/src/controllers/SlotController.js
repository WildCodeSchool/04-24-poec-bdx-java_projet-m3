import SlotManager from "../mangers/SlotManager.js";

export default class SlotController {
  constructor(database) {
    this.slotManager = new SlotManager(database);
  }

  async addSlot(req, res) {
    try {
      const slotInfo = req.body;
      const result = await this.slotManager.addSlot(slotInfo);
      res.json(result);
    } catch (error) {
      console.error("Error adding slot:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async getSlots(req, res) {
    const mentorId = req.query.mentorId;

    if (!mentorId) {
      return res.status(400).json({ error: "mentorId est requis" });
    }

    try {
      const slots = await this.slotManager.getSlots();

      const filteredSlots = slots.filter((slot) => slot.mentorId == mentorId);

      // if (filteredSlots.length === 0) {
      //   return res
      //     .status(404)
      //     .json({ error: "Aucun créneau trouvé pour ce mentorId" });
      // }

      res.json(filteredSlots);
    } catch (error) {
      console.error("Error getting slots:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async deleteSlot(req, res) {
    try {
      const id = req.params.id;
      const result = await this.slotManager.deleteSlot(id);
      res.json(result);
    } catch (error) {
      console.error("Error deleting slot:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async updateSlot(req, res) {
    try {
      const id = req.params.slotId;
      const slotInfo = req.body;
      const { dateTime, dateEnd } = slotInfo;
      console.log(slotInfo);

      const existingSlots = await this.slotManager.getSlots(slotInfo.mentorId);
      console.log(existingSlots);
      const isOverlap = existingSlots.some((slot) => {
        if (slot.id !== id) {
          return (
            new Date(dateTime) < new Date(slot.dateEnd) &&
            new Date(dateEnd) > new Date(slot.dateTime)
          );
        }
        return false;
      });

      if (isOverlap) {
        return res.status(400).json({
          success: false,
          message: "Ce créneau est déjà ouvert sur votre agenda",
        });
      }

      const result = await this.slotManager.updateSlot(id, slotInfo);
      res.json(result);
    } catch (error) {
      console.error("Error updating slot:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
}
