import bcrypt from "bcrypt";
import db from "../database/index.js";
import generatePassword from "../utils/generatePassword.js";
import ResponseController from "./ResponseController.js";

class AuthController extends ResponseController {
  existUser(req) {
    const { email } = req.body;

    const q = "SELECT * FROM `users` WHERE `email` = ?";

    db.query(q, [email], (error, data) => {
      if (data.length) return true;

      return false;
    });
  }

  auth(req, res) {
    const { email, password } = req.body;

    const q = "SELECT * FROM `users` WHERE `email` = ?";

    db.query(q, [email], (error, user) => {
      user = user.pop();

      if (error) {
        return super.failed(res, {
          message: "Invalid credentials",
        });
      }

      if (!user) {
        return super.failed(res, {
          message: "Invalid credentials",
        });
      }

      if (!bcrypt.compare(password, user.password)) {
        return super.failed(res, {
          message: "Invalid credentials",
        });
      }

      return super.success(res, user);
    });
  }

  register(req, res) {
    const { email, password, username } = req.body;

    const getUserQuery = "SELECT * FROM `users` WHERE `email` = ?";

    db.query(getUserQuery, [email], async (error, data) => {
      if (error) {
        return super.failed(res);
      }

      if (data.length) {
        return super.failed(res);
      }

      const hashedPassword = await generatePassword(password);

      const createUser =
        "INSERT INTO `users` (`username`, `email`, `password`) VALUES (?)";

      db.query(createUser, [username, email, hashedPassword], (error, data) => {
        if (error) {
          return super.failed(res);
        }

        return super.success(res, {
          message: "Success!",
        });
      });
    });
  }
}

export default AuthController;
