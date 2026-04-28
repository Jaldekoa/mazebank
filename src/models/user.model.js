import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { tableName: "user", timestamps: false },
);

export default UserModel;
