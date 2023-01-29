import express from "express";
import cors from "cors";
import sequelize from "./database/sequelize.js";

import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userRoutes from "./routes/users.js";
import repositoryRoutes from "./routes/repositories.js";
import tagRoutes from "./routes/tags.js";
import authRoutes from "./routes/auth.js";

app.use("/api", [userRoutes, tagRoutes, repositoryRoutes]);
app.use("/api/auth", authRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(
      port,
      console.log(`Server has been started: http://127.0.0.1:${port}/`)
    );
  })
  .catch((error) => {
    console.log(`Database has error: ${error.message}`);
  });
