export default class ReservationManager {
  constructor(database) {
    this.database = database;
  }

  async getAllReservations() {
    try {
      const [reservations] = await this.database.query(
        `SELECT * FROM reservations`
      );
      return reservations;
    } catch (error) {
      throw error;
    }
  }

  async getUserReservations(userId) {
    try {
      const [reservations] = await this.database.query(
        `SELECT r.subject , s.dateTime, s.visio, m.firstname , m.lastname, m.imgUrl, m.title FROM reservations as r
         join slots as s on s.id = slotId
         join mentors as m on s.mentorId = m.id
         where r.userId = ?`,
        [userId]
      );
      return reservations;
    } catch (error) {
      throw error;
    }
  }

  async getMentorReservations(mentorId) {
    try {
      const [reservations] = await this.database.query(
        `SELECT r.subject, sl.dateTime, s.firstname, s.lastname , s.userId, s.imgUrl, sl.visio, s.title from reservations as r
            join slots as sl on sl.id = r.slotId
            join students as s on s.userId = r.userId       
            where sl.mentorId = ?`,
        [mentorId]
      );
      return reservations;
    } catch (error) {
      throw error;
    }
  }

  async deleteReservation(reservationId) {
    try {
      // Supprimer le skill de la table des skills
      await this.database.query(`DELETE FROM reservations WHERE id = ?`, [
        reservationId,
      ]);

      return { success: true, message: "Skill deleted successfully" };
    } catch (error) {
      throw error;
    }
  }

  async addReservation(subject, message, slotId, userId) {
    try {
      const [reservation] = await this.database.query(
        `SELECT * FROM reservations where slotId = ? `,
        [slotId]
      );

      if (reservation.length) {
        return { success: false, message: "Skill already exists" };
      }

      await this.database.query(
        `INSERT INTO reservations (subject, message, slotId, userId) VALUES (?, ? , ? ,?)`,
        [subject, message, slotId, userId]
      );

      return { success: true, message: "Skill added successfully" };
    } catch (error) {
      throw error;
    }
  }

  async updateReservation(id, props) {
    let sql = `UPDATE reservations set`;
    const sqlValues = [];
    for (const [key, value] of Object.entries(props)) {
      if (key !== "id") {
        sql += `${sqlValues.length ? "," : ""} ${key} = ?`;
        sqlValues.push(value);
      }
    }
    sql += ` where id = ?`;
    sqlValues.push(id);
    const [res] = await this.database.query(sql, sqlValues);
    return res.affectedRows;
  }
}
