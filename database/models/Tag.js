import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const Tag = sequelize.define("tag", {
  id: {
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
});

export default Tag;
