export default class SlotManager {
  constructor(database) {
    this.database = database;
  }

  async addSlot(slotInfo) {
    try {
      const [slot] = await this.database.query(
        `SELECT * FROM slots where dateTime = ? and visio = ?`,
        [slotInfo.dateTime, slotInfo.visio]
      );

      if (slot.length > 0) {
        return { success: false, message: "Slot already exists" };
      }

      const result = await this.database.query(
        `INSERT INTO slots (dateTime, visio, mentorId) VALUES (?,?,?)`,
        [slotInfo.dateTime, slotInfo.visio, slotInfo.mentorId]
      );

      return {
        success: true,
        message: "Slot added successfully",
        slotId: result.insertId,
      };
    } catch (error) {
      throw error;
    }
  }
}
