import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const generatePassword = async (string) => {
  return await bcrypt.hash(string, parseInt(process.env.BCRYPT_SALT));
};

export const makeToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};
