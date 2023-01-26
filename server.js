import express from "express";
import cors from "cors";

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

app.use(express.json())

// Include routes
app.use("/api", tagRoutes);
app.use("/api", userRoutes);
app.use("/api", authRoutes);

app.listen(port, () => {
  console.log(`Server has been started: http://127.0.0.1:${port}/`);

  (async () => {
    console.log('Random password');
    console.log(await generatePassword("avavionmvm"));
  })();
});
