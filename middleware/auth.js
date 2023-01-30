import { ROLES } from "../database/models/User.js";
import { verifyToken } from "../heplers/index.js";

class Auth {
  async validate(req, res, next) {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers.authorization.split(" ").at(-1) ||
      null;

    if (!token) {
      return res.status(403).json({
        messsage: "Unauthorized.",
      });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return res.status(403).json({
        messsage: "Unauthorized.",
      });
    }

    req.user = payload;

    next();
  }

  async admin(req, res, next) {
    if (req.user.role === ROLES.ADMIN) {
      return next();
    }

    return res.status(403).json({
      message: "Access denied",
    });
  }

  async refresh(req, res, next) {
    next();
  }
}

export default new Auth();
