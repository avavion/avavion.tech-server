import bcrypt from "bcrypt";
import db from "../database/index.js";
import generatePassword from "../utils/generatePassword.js";
import ResponseController from "./ResponseController.js";

class AuthController extends ResponseController {
  async existUser(req) {
    const { email } = req.body;

    const q = "SELECT * FROM `users` WHERE `email` = ?";

    const [rows] = await db.promise().query(q, [email]);

    if (rows.length) return true;

    return false;
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

  async register(req, res) {
    const { email, password, username } = req.body;

    const isExists = await this.existUser(req);

    if (isExists) {
      return super.failed(res, {
        message:
          "Электронная почта уже используется. Если не помните пароль, обратитесь к администратору веб-сайта",
      });
    }

    const q =
      "INSERT INTO `users` (`username`, `email`, `password`) VALUES (?)";

    const hashedPassword = await generatePassword(password);

    const [rows, fields] = await db
      .promise()
      .query(q, [username, email, hashedPassword]);

    console.log(rows, fields);

    // const [users] = await db
    //   .promise()
    //   .query("SELECT * FROM `users` WHERE `email` = ?", [email]);

    // const [repositories] = await db
    //   .promise()
    //   .query("SELECT * FROM `users` WHERE `email` = ?", [email]);
    // console.log(users, repositories);

    super.success(res, {
      message: "Well, check console",
      rows,
      fields,
    });

    const getUserQuery = "SELECT * FROM `users` WHERE `email` = ?";

    // const getUser = new Promise((resolve, reject) => {
    //   db.query(getUserQuery, [email], (error, user) => {
    //     if (error) {
    //       reject(error);
    //     }

    //     resolve(user);
    //   });
    // });

    // getUser
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .then(async () => {
    //       const hashedPassword = await generatePassword(password);

    //       const createUser =
    //         "INSERT INTO `users` (`username`, `email`, `password`) VALUES (?)";

    //     db.query(
    //       createUser,
    //       [username, email, hashedPassword],
    //       (error, data) => {
    //         console.log(data);
    //         if (error) {
    //           return super.failed(res);
    //         }
    //         return super.success(res, {
    //           message: "Success!",
    //         });
    //       }
    //     );
    //   });

    // db.query(getUserQuery, [email], async (error, data) => {
    //   if (error) {
    //     return super.failed(res);
    //   }

    //   if (data.length) {
    //     return super.failed(res);
    //   }

    //   const hashedPassword = await generatePassword(password);

    //   const createUser =
    //     "INSERT INTO `users` (`username`, `email`, `password`) VALUES (?)";

    //   db.query(createUser, [username, email, hashedPassword], (error, data) => {
    //     if (error) {
    //       return super.failed(res);
    //     }

    //     return super.success(res, {
    //       message: "Success!",
    //     });
    //   });
    // });
  }
}

export default AuthController;
