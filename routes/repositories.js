import express from "express";
import RepositoryController from "../controllers/RepositoryController.js";

const router = express.Router();
const controller = new RepositoryController();

router.get("/repositories", controller.getAll);
router.get("/repositories/:id", controller.getById);

export default router;
