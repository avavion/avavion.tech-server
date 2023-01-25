import bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config();

const generatePassword = async (string) => {
  const password = await bcrypt.hash(string, parseInt(process.env.BCRYPT_SALT));

  return password;
};

export default generatePassword;
