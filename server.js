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

import { Sequelize, DataTypes, Op } from "sequelize";

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

// generatePassword("timoha").then((data) => console.log(data));

const users = [
  {
    username: "avavion.",
    email: "avavionmvm@gmail.com",
    password: "$2b$10$LezLNts0XiZXzF9Axci65OyVIE6mv528MJNgCcPacKZXkMpmM5Zn6",
    role: "admin",
  },
  {
    username: "vazgen",
    email: "vazgen@gmail.com",
    password: "$2b$10$6ux8FEI3uYBzeWItGcYstuiMi/G9dMgoPnI37yvUwfbo0rraGzosq",
  },
  {
    username: "ceh9",
    email: "ceh9@gmail.com",
    password: "$2b$10$1Gexf6pat4/MhZcc2xUn.uYsfKmCW8errd4MRVDOugFFkp/mKXvh6",
  },
  {
    username: "heritage",
    email: "heritage@gmail.com",
    password: "$2b$10$dKQqh7I0hPKiB78JlROtlO4NrxG62L1Ct./QDnF2CVX8xs6u25Qj.",
  },
  {
    username: "timoha",
    email: "timoha@gmail.com",
    password: "$2b$10$ABsB5vwFnsn.hheR9IOBw.N2zh20wFaYALxoNtZvYMj8uJt.YZXiy",
  },
];

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

User.sync({ alter: true })
  .then(() => {
    // return User.bulkCreate(users);
    // console.log();

    // return User.findAll({
    // where: {
    //   // username: "avavion.",
    // },
    // order: [
    //   ['email', 'ASC']
    // ]
    // where: {
    //   id: {
    //     [Op.lt]: 3,
    //   },
    // },
    // });

    return User.update(
      {
        username: "avavion",
      },
      {
        where: {
          username: "avavion.",
        },
      }
    );

    // console.log(users);
  })
  .then((data) => {
    // data.forEach((u) => console.log(u.toJSON()));
  })
  .catch((error) => console.error(error.message));

app.listen(port, () => {
  console.log(`Server has been started: http://127.0.0.1:${port}/`);
});
