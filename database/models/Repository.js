import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const Repository = sequelize.define("repository", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  content: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  url: {
    allowNull: true,
    type: DataTypes.STRING,
    defaultValue: "https://github.com/avavion",
  },
});

export default Repository;
