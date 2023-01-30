import ResponseController from "./ResponseController.js";
import { User } from "../database/models/index.js";

class UserController extends ResponseController {
  async getAll(req, res) {
    console.log(req.user);

    const users = await User.findAll();

    return super.success(res, users, 200);
  }

  async getById(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return super.failed(
        res,
        {
          message: "User not found!",
        },
        200
      );
    }

    return super.success(res, user, 200);
  }
}

export default UserController;
