import SlotManager from "../mangers/SlotManager.js";

export default class SlotController {
  constructor(database) {
    this.slotManager = new SlotManager(database);
  }

  async addSlot(req, res) {
    try {
      const slotInfo = req.body;
      console.log("slotInfo", slotInfo);
      const result = await this.slotManager.addSlot(slotInfo);
      res.json(result);
    } catch (error) {
      console.error("Error adding slot:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
}
