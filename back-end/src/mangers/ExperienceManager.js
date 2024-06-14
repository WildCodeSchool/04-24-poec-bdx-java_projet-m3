import { client } from "../clientDb/client.js";
export default class ExperienceManager {
  static async getAllExperiences() {
    try {
      const [skills] = await client.query(`SELECT * FROM experiences`);
      return skills;
    } catch (error) {
      throw error;
    }
  }

  static async getUserExperiences(userId) {
    try {
      const [experiences] = await client.query(
        `SELECT * FROM experiences
          WHERE userId = ?`,
        [userId]
      );
      return experiences;
    } catch (error) {
      throw error;
    }
  }

  static async addExperience(
    title,
    company,
    dateBegin,
    dateEnd,
    city,
    country,
    userId
  ) {
    try {
      const [experience] = await client.query(
        `SELECT * FROM experiences where title = ? and company = ? and dateBegin = ? and dateEnd = ? `,
        [title, company, dateBegin, dateEnd]
      );

      if (experience.length) {
        return { success: false, message: "experience already exists" };
      }

      await client.query(
        `
        INSERT INTO experiences
        (title, company, dateBegin, dateEnd, city, country, userId) VALUES
        (? , ?, ? , ? ,? ,? ,?)`,
        [title, company, dateBegin, dateEnd, city, country, userId]
      );
      const experiences = await ExperienceManager.getUserExperiences(userId);

      return {
        success: true,
        message: "experience added successfully",
        experiences,
      };
    } catch (error) {
      throw error;
    }
  }

  static async deleteExperience(experienceId, userId) {
    try {
      await client.query(`DELETE FROM experiences WHERE id = ?`, [
        experienceId,
      ]);
      const experiences = await ExperienceManager.getUserExperiences(userId);
      return {
        success: true,
        message: "experience deleted successfully",
        experiences,
      };
    } catch (error) {
      throw error;
    }
  }

  static async updateExperience(id, props) {
    let sql = `UPDATE experiences set`;
    const sqlValues = [];
    for (const [key, value] of Object.entries(props)) {
      sql += `${sqlValues.length ? "," : ""} ${key} = ?`;
      sqlValues.push(value);
    }
    sql += ` where id = ?`;
    sqlValues.push(id);
    const [res] = await client.query(sql, sqlValues);
    const experiences = await ExperienceManager.getUserExperiences(
      props.userId
    );
    return { affectedRows: res.affectedRows, experiences };
  }
}
