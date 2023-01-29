import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Database has been connected succesfuly"))
  .catch((error) => console.error(error.message));

export default sequelize;
