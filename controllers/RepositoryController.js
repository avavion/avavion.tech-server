import Repository from "../database/models/Repository.js";
import ResponseController from "./ResponseController.js";

class RepositoryController extends ResponseController {
  async getAll(req, res) {
    const repositories = await Repository.findAll();

    return super.success(res, repositories, 200);
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
