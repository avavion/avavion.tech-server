import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();
const controller = new UserController();

router.get("/users", controller.getAll);
router.get("/users/:id", controller.getById);

export default router;
