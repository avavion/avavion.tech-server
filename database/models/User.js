import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
};

const User = sequelize.define("user", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  username: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    defaultValue: "user",
    type: DataTypes.ENUM(Object.values(ROLES)),
  },
});

export default User;
