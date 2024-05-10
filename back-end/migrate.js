import "dotenv/config";
import fs from "fs";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
import mysqlPromise from "mysql2/promise.js";

const migrate = async () => {
  try {
    const sql = fs.readFileSync("./src/clientDb/schema.sql", "utf8");

    const database = await mysqlPromise.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true,
    });

    await database.query(`drop database if exists ${DB_NAME}`);

    await database.query(`create database ${DB_NAME}`);
    await database.query(`use ${DB_NAME}`);
    await database.query(sql);
    database.end();
  } catch (err) {
    console.error("Error updating the database:", err.message);
  }
};

migrate();
