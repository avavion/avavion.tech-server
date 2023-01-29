import express from "express";
import TagController from "../controllers/TagController.js";

const router = express.Router();
const controller = new TagController();

router.get("/tags", controller.getAll);
router.get("/tags/:id", controller.getById);

export default router;
