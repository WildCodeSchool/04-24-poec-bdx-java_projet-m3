import { client } from "../clientDb/client.js";
import bcrypt from "bcrypt";

class UserManager {
  static async hashing(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
  static async compare(password, passwordHash) {
    const res = await bcrypt.compare(password, passwordHash);
    return res;
  }
  static async browse() {
    try {
      const [rows] = await client.query(`select * from users`);
      return rows;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  static async read(email) {
    try {
      const [rows] = await client.query(`select * from users where email = ?`, [
        email,
      ]);
      return rows[0];
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  static async login(email, password) {
    try {
      const [rows] = await client.query(`select * from users where email = ?`, [
        email,
      ]);
      if (rows[0]) {
        const success = await this.compare(password, rows[0].password);
        if (success) {
          delete rows[0].password;
          return rows[0];
        }
      }
      return null;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  static async add(email, password, role) {
    try {
      const hashedPassword = await UserManager.hashing(password);
      const [result] = await client.query(
        `insert into users (email, password, role) values (? , ? , ?)`,
        [email, hashedPassword, role]
      );
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async delete(email) {
    try {
      const [result] = await client.query(`delete from users WHERE email = ?`, [
        email,
      ]);
      return result;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  static async update(email, props) {
    let sql = `UPDATE users set`;
    const sqlValues = [];
    let hashedPassword = "";
    for (const [key, value] of Object.entries(props)) {
      if (key === "password") {
        hashedPassword = await UserManager.hashing(props.password);
        sql += `${sqlValues.length ? "," : ""} ${key} = ?`;
        sqlValues.push(hashedPassword);
      } else if (key !== "email") {
        sql += `${sqlValues.length ? "," : ""} ${key} = ?`;
        sqlValues.push(value);
      }
    }
    sql += ` where email = ?`;
    sqlValues.push(email);
    const [res] = await client.query(sql, sqlValues);
    return res.affectedRows;
  }
}
export default UserManager;
