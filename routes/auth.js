import express from "express";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();
const controller = new AuthController();

router.post("/signin", controller.signin);
router.post("/signup", controller.signup);

export default router;
