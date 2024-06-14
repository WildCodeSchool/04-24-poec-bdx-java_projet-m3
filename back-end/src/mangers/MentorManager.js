import { client } from "../clientDb/client.js";

export default class MentorManager {
  static async browse(perPage, offset) {
    let sql = `select * from mentors`;
    const sqlValues = [];

    if (+perPage && +offset !== undefined) {
      sql += ` limit ? offset ?`;
      sqlValues.push(+perPage);
      sqlValues.push(+offset);
    }
    const [rows] = await client.query(sql, sqlValues);
    return rows;
  }

  static async read(userId) {
    try {
      const [rows] = await client.query(
        `select * from mentors where userId = ?`,
        [userId]
      );
      return rows[0];
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  static async add(
    firstname,
    lastname,
    title = "mentor",
    description = "",
    userId,
    imgUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/828px-User_icon-cp.svg.png",
    githubUrl = "www.github.com",
    linkedinUrl = "www.linkedin.com"
  ) {
    try {
      const [result] = await client.query(
        `insert into mentors (firstname, lastname, title, description,userId, imgUrl, githubUrl, linkedinUrl) 
        values (? , ? , ? , ? , ? , ? , ? , ?)`,
        [
          firstname,
          lastname,
          title,
          description,
          parseInt(userId),
          imgUrl,
          githubUrl,
          linkedinUrl,
        ]
      );
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async delete(id) {
    try {
      const [result] = await client.query(`delete from mentors WHERE id = ?`, [
        id,
      ]);
      return result;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  static async update(userId, props) {
    let sql = `UPDATE mentors set`;
    const sqlValues = [];
    for (const [key, value] of Object.entries(props)) {
      sql += `${sqlValues.length ? "," : ""} ${key} = ?`;
      sqlValues.push(value);
    }
    sql += ` where userId = ?`;
    sqlValues.push(userId);
    const [res] = await client.query(sql, sqlValues);
    const profil = await MentorManager.read(userId);
    return { affectedRows: res.affectedRows, profil, success: true };
  }

  static async updateImage(userId, imgUrl) {
    const res = await client.query(
      `UPDATE mentors SET imgUrl = ? WHERE userId = ?`,
      [imgUrl, +userId]
    );

    const profil = await MentorManager.read(userId);
    return { affectedRows: res.affectedRows, profil, success: true };
  }
}
