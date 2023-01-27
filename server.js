import express from "express";
import cors from "cors";

import * as dotenv from "dotenv";

dotenv.config();

// Routes
import tagRoutes from "./routes/tags.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import generatePassword from "./utils/generatePassword.js";

const app = express();
const port = 5050;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// Include routes
// app.use("/api", tagRoutes);
// app.use("/api", userRoutes);
// app.use("/api", authRoutes);

import { Sequelize, DataTypes } from "sequelize";

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
  .then(() => console.log("Connection successful!"))
  .catch((error) => console.error(error.message));

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM,
    values: ["user", "admin"],
    defaultValue: "user",
  },
});

User.sync({ force: true })
  .then(() => {
    const user = User.build({
      username: "avavion.",
      email: "avavionmvm@gmail.com",
      password: "$2b$10$TrCrCUFwmtyDA7GmLoTinug5LPZjg.9Jz/JKKNDAhuhCIMK27GZi6",
      role: "admin",
    });

    console.log(user);

    console.log("Table and model synced successfully!");
  })
  .catch((error) => console.error(error.message));

app.listen(port, () => {
  console.log(`Server has been started: http://127.0.0.1:${port}/`);
});
