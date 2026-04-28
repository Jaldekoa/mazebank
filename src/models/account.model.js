import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const AccountModel = sequelize.define(
  "Account",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "user", key: "id" },
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(null, 2),
      allowNull: false,
    },
  },
  { tableName: "account", timestamps: false },
);

export default AccountModel;
