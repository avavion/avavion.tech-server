import express from "express";
import RepositoryController from "../controllers/RepositoryController.js";
import auth from "../middleware/auth.js";

const router = express.Router();
const controller = new RepositoryController();

router.get("/repositories", controller.getAll);
router.get("/repositories/:id", controller.getById);
router
  .use([auth.validate, auth.admin])
  .post("/repositories/create", controller.create);

export default router;
