import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const RepositoryTags = sequelize.define(
  "RepositoryTags",
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    repository_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "repository",
        key: "id",
      },
    },
    tag_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id",
      },
    },
  },
  {
    tableName: "repository_tags",
    underscored: true,
  }
);

export default RepositoryTags;
