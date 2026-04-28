import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const TransactionsModel = sequelize.define(
  "Account",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    senderIAccountId: {
      type: DataTypes.INTEGER,
      references: { model: "account", key: "id" },
      allowNull: false,
    },
    receiverIAccountId: {
      type: DataTypes.INTEGER,
      references: { model: "account", key: "id" },
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(null, 2),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("depósito", "retiro", "transferencia"),
      allowNull: false,
    },
  },
  { tableName: "transactions", timestamps: false },
);

export default TransactionsModel;
