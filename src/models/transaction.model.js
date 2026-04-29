import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const TransactionsModel = sequelize.define(
  "Transactions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    senderAccountId: {
      type: DataTypes.INTEGER,
      references: { model: "Accounts", key: "id" },
      allowNull: true,
    },
    receiverAccountId: {
      type: DataTypes.INTEGER,
      references: { model: "Accounts", key: "id" },
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("DEPOSIT", "WITHDRAWAL", "TRANSFER"),
      allowNull: false,
    },
  },
  { tableName: "Transactions", timestamps: true },
);

export default TransactionsModel;
