import express from "express";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();
const controller = new AuthController();

router.post("/auth/signin", controller.signin);
router.post("/auth/signup", controller.signup);

export default router;
