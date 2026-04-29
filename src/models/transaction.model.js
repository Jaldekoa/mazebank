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
    accountId: {
      type: DataTypes.INTEGER,
      references: { model: "Accounts", key: "id" },
      allowNull: false,
    },
    senderAccountId: {
      type: DataTypes.INTEGER,
      references: { model: "Accounts", key: "id" },
      allowNull: false,
    },
    receiverAccountId: {
      type: DataTypes.INTEGER,
      references: { model: "Accounts", key: "id" },
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("TRANSFER", "INTERNAL"),
      allowNull: false,
    },
  },
  { tableName: "Transactions", timestamps: true },
);

export default TransactionsModel;
