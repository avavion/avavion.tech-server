import { Repository } from "../database/models/index.js";
import ResponseController from "./ResponseController.js";

class RepositoryController extends ResponseController {
  async getAll(req, res) {
    const repositories = await Repository.findAll();

    return super.success(res, repositories, 200);
  }

  async create(req, res) {
    const { title, content, url } = req.body;

    try {
      const repository = await Repository.create({
        title,
        content,
        url,
      });

      return super.success(res, repository, 201);
    } catch (error) {
      return super.failed(res, {
        message: error.message,
      });
    }
  }

  async getById(req, res) {
    const { id } = req.params;

    const repository = await Repository.findByPk(id);

    if (!repository) {
      return super.failed(
        res,
        {
          message: "Repository not found!",
        },
        200
      );
    }

    return super.success(res, repository, 200);
  }
}

export default RepositoryController;
