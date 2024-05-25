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

  async getSlots(mentorId) {
    try {
      let query = `SELECT * FROM slots`;
      const params = [];

      if (mentorId) {
        query += ` WHERE mentorId = ?`;
        params.push(mentorId);
      }

      const [slots] = await this.database.query(query, params);
      return slots;
    } catch (error) {
      throw error;
    }
  }

  // async updateSlot(id, slotInfo) {
  //   try {
  //     const [slot] = await this.database.query(
  //       `SELECT * FROM slots where id = ?`,
  //       [id]
  //     );

  //     if (slot.length === 0) {
  //       return { success: false, message: "Slot not found" };
  //     }

  //     const result = await this.database.query(
  //       `UPDATE slots SET dateTime = ?, visio = ? WHERE id = ?`,
  //       [slotInfo.dateTime, slotInfo.visio, id]
  //     );

  //     return {
  //       success: true,
  //       message: "Slot updated successfully",
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
