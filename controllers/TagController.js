import Tag from "../database/models/Tag.js";
import ResponseController from "./ResponseController.js";

class TagController extends ResponseController {
  async getAll(req, res) {
    const tags = await Tag.findAll();

    return super.success(res, tags);
  }

  async getById(req, res) {
    const { id } = req.params;

    const tag = await Tag.findByPk(id);

    return super.success(res, tag);
  }
}

export default TagController;
