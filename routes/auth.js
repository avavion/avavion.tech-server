import express from "express";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();
const controller = new AuthController();

router.post("/auth", controller.auth);
router.post("/register", controller.register.bind(controller));

export default router;
