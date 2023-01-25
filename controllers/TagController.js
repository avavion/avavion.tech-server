import db from "../database/index.js";

import ResponseController from "./ResponseController.js";

class TagController extends ResponseController {
  getAll(req, res) {
    const q = "SELECT * FROM `tags`";

    db.query(q, (error, data) => {
      if (error) {
        return super.failed(res, {
          message: "An error occurred during the query!",
          error: error.message,
        });
      }

      return super.success(res, data);
    });
  }

  getById(req, res) {
    const q = "SELECT * FROM `tags` WHERE `id` = ?";

    db.query(q, [req.params.id], (error, data) => {
      if (error) {
        return super.failed(res, {
          message: "An error occurred during the query!",
          error: error.message,
        });
      }

      return super.success(res, ...data);
    });
  }
}

export default TagController;
