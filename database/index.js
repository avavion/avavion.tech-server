import * as dotenv from "dotenv";

import mysql from "mysql2";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((error) => {
  if (error) {
    throw new Error(error);
  }

  console.log("Database has been started succesfull");
});

export default db;
