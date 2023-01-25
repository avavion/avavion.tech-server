import ResponseController from "./ResponseController.js";
import db from "../database/index.js";

class UserController extends ResponseController {
  getAll(req, res) {
    const q = "SELECT * FROM `users`";

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
}

export default UserController;
