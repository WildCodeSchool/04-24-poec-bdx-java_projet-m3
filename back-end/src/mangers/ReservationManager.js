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

  async getUserReservations(userId, perPage, offset) {
    try {
      let timeNow = new Date();
      timeNow.setHours(timeNow.getHours());
      let query = `SELECT  r.subject , r.id, s.dateTime, s.visio, m.firstname , m.lastname, 
      m.imgUrl, m.title , m.id as mentorId,m.userId as userId,s.id as slotId,
      COUNT(*) OVER() as totalCount FROM reservations as r
      join slots as s on s.id = slotId 
      join mentors as m on s.mentorId = m.userId
      where r.userId = ? and s.dateTime >= ?
      order by s.dateTime asc
      `;
      let values = [userId, timeNow];

      if (perPage && offset !== undefined) {
        query += `limit ? offset ?`;
        values.push(+perPage);
        values.push(+offset);
      }
      const [reservations] = await this.database.query(query, values);
      const total = reservations[0]?.totalCount ?? 0;
      return { reservations, total };
    } catch (error) {
      throw error;
    }
  }

  async getUserReservationsHistory(userId, perPage, offset) {
    try {
      let timeNow = new Date();
      timeNow.setHours(timeNow.getHours());
      let query = `SELECT  r.subject ,r.id , s.dateTime, s.visio, m.firstname , m.lastname, m.imgUrl, 
      m.title , m.id as mentorId, m.userId as userId, s.id as slotId, 
      count(*) over() as totalCount FROM reservations as r
      join slots as s on s.id = slotId
      join mentors as m on s.mentorId = m.userId
      where r.userId = ? and s.dateTime < ?
      order by s.dateTime desc
      `;
      let values = [userId, timeNow];

      if (perPage && offset !== undefined) {
        query += `limit ? offset ?`;
        values.push(+perPage);
        values.push(+offset);
      }
      const [reservations] = await this.database.query(query, values);
      const total = reservations[0]?.totalCount ?? 0;
      return { reservations, total };
    } catch (error) {
      throw error;
    }
  }

  async getMentorReservations(mentorId, perPage, offset) {
    try {
      let timeNow = new Date();
      timeNow.setHours(timeNow.getHours());

      let query = `SELECT r.subject as subject, r.id, sl.dateTime as dateTime, sl.id as slotId, s.firstname as firstname,
      s.lastname  as lastname, s.id as studentId,s.userId as userId, s.imgUrl as imgUrl, sl.visio as visio,
       s.title as title, COUNT(*) OVER() as totalCount from reservations as r
         join slots as sl on sl.id = r.slotId
         join students as s on s.userId = r.userId       
         where sl.mentorId = ? and sl.dateTime >= ?
       order by sl.dateTime asc
         `;
      let values = [mentorId, timeNow];
      if (perPage && offset !== undefined) {
        query += `limit ? offset ?`;
        values.push(+perPage);
        values.push(+offset);
      }
      let [reservations] = await this.database.query(query, values);

      const total = reservations[0]?.totalCount ?? 0;

      if (reservations.length) {
        reservations = reservations.map((reservation) => {
          return {
            id: +reservation.id,
            slotId: +reservation.slotId,
            studentId: +reservation.studentId,
            userId: +reservation.userId,
            message: "",
            subject: reservation.subject,
            dateTime: reservation.dateTime,
            visio: true,

            firstname: reservation.firstname,
            lastname: reservation.lastname,
            title: reservation.title,
            imgUrl: reservation.imgUrl,
          };
        });
      }
      return { reservations, total };
    } catch (error) {
      throw error;
    }
  }

  async getMentorReservationsHistory(mentorId, perPage, offset) {
    try {
      let timeNow = new Date();
      timeNow.setHours(timeNow.getHours());

      let query = `SELECT r.subject as subject, r.id,r.message, sl.dateTime as dateTime, sl.id as slotId, s.firstname as firstname,
      s.lastname  as lastname, s.id as studentId, s.userId as userId, s.imgUrl as imgUrl, sl.visio as visio,
       s.title as title, COUNT(*) OVER() as totalCount from reservations as r
         join slots as sl on sl.id = r.slotId
         join students as s on s.userId = r.userId       
         where sl.mentorId = ? and sl.dateTime < ?
       order by sl.dateTime desc
         `;
      let values = [mentorId, timeNow];
      if (perPage && offset !== undefined) {
        query += `limit ? offset ?`;
        values.push(+perPage);
        values.push(+offset);
      }
      let [reservations] = await this.database.query(query, values);

      const total = reservations[0]?.totalCount ?? 0;
      console.log(reservations);

      if (reservations.length) {
        reservations = reservations.map((reservation) => {
          return {
            id: +reservation.id,
            slotId: +reservation.slotId,
            studentId: +reservation.studentId,
            userId: +reservation.userId,
            message: reservation.message,
            subject: reservation.subject,
            dateTime: reservation.dateTime,
            visio: true,
            firstname: reservation.firstname,
            lastname: reservation.lastname,
            title: reservation.title,
            imgUrl: reservation.imgUrl,
          };
        });
      }
      return { reservations, total };
    } catch (error) {
      throw error;
    }
  }

  async deleteReservation(reservationId) {
    try {
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

  async updateReservationNote(id, props) {
    let sql = `UPDATE reservations set message = ? where id = ? `;

    const [res] = await this.database.query(sql, [props.message, id]);
    const reservations = await this.getMentorReservationsHistory(
      props.mentorId,
      5,
      0
    );
    return { affectedRows: res.affectedRows, ...reservations };
  }

  async deleteMentorReservation(reservationId, userId) {
    try {
      await this.database.query(`DELETE FROM reservations WHERE id = ?`, [
        reservationId,
      ]);
      const reservations = await this.getMentorReservations(userId, 5, 0);
      return {
        success: true,
        message: "Skill deleted successfully",
        ...reservations,
      };
    } catch (error) {
      throw error;
    }
  }
}
