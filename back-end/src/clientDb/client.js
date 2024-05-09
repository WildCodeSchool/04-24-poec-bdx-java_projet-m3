import "dotenv/config";
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

import mysqlPromise from "mysql2/promise.js";

const client = mysqlPromise.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

client
  .getConnection()
  .then((connection) => {
    console.info(`Using database ${DB_NAME}`);

    connection.release();
  })
  .catch((error) => {
    console.warn(
      "Warning:",
      "Failed to establish a database connection.",
      "Please check your database credentials in the .env file if you need a database access."
    );
    console.error("Error message:", error.message);
  });

client.databaseName = DB_NAME;

export { client };
