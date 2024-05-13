import { client } from "../clientDb/client.js";
export default class FormationManager {
  static async getAllFormations() {
    try {
      const [skills] = await client.query(`SELECT * FROM formations`);
      return skills;
    } catch (error) {
      throw error;
    }
  }

  static async getFormationById(formationId) {
    try {
      const [formation] = await client.query(
        `SELECT * FROM formations where id = ?`,
        [formationId]
      );
      return formation;
    } catch (error) {
      throw error;
    }
  }

  static async getUserFormations(userId) {
    try {
      const [formations] = await client.query(
        `SELECT * FROM formations
          WHERE userId = ?`,
        [userId]
      );
      return formations;
    } catch (error) {
      throw error;
    }
  }

  static async addFormation(
    title,
    company,
    dateBegin,
    dateEnd,
    city,
    country,
    userId
  ) {
    try {
      const [formation] = await client.query(
        `SELECT * FROM formations where title = ? and company = ? and dateBegin = ? and dateEnd = ? `,
        [title, company, dateBegin, dateEnd]
      );

      if (formation.length) {
        return { success: false, message: "formation already exists" };
      }

      await client.query(
        `
      INSERT INTO formations 
      (title, company, dateBegin, dateEnd, city, country, userId) VALUES 
      (? , ?, ? , ? ,? ,? ,?)`,
        [title, company, dateBegin, dateEnd, city, country, userId]
      );

      return { success: true, message: "formation added successfully" };
    } catch (error) {
      throw error;
    }
  }

  static async deleteFormation(formationId) {
    try {
      await client.query(`DELETE FROM formations WHERE id = ?`, [formationId]);
      return { success: true, message: "formation deleted successfully" };
    } catch (error) {
      throw error;
    }
  }

  static async updateFormation(id, props) {
    let sql = `UPDATE formations set`;
    const sqlValues = [];
    for (const [key, value] of Object.entries(props)) {
      sql += `${sqlValues.length ? "," : ""} ${key} = ?`;
      sqlValues.push(value);
    }
    sql += ` where id = ?`;
    sqlValues.push(id);
    const [res] = await client.query(sql, sqlValues);
    return res.affectedRows;
  }
}
