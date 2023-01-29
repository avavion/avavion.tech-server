import bcrypt from "bcrypt";
import User from "../database/models/User.js";
import generatePassword from "../utils/generatePassword.js";
import ResponseController from "./ResponseController.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

class AuthController extends ResponseController {
  async signin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      const response = {
        message: "The user with this email does not exist",
      };

      return super.failed(res, response);
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      const response = {
        message: "Inncorect email or password",
      };

      return super.failed(res, response);
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    const response = {
      message: "Authorization was successful!",
      token: token,
    };

    return super.success(res, response);
  }

  async signup(req, res) {
    const { username, email, password } = req.body;

    const hashPassword = await generatePassword(password);

    const [user, created] = await User.findOrCreate({
      where: {
        username: username,
        email: email,
      },
      defaults: {
        email: email,
        username: username,
        password: hashPassword,
      },
    });

    if (!created) {
      const response = {
        message: "A user already exists",
      };

      return super.failed(res, response);
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    const response = {
      message: "The user was successfully created",
      created: created,
      token: token,
    };

    return super.success(res, response, 201);
  }
}

export default AuthController;
