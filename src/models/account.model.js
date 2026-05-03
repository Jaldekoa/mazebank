import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const AccountModel = sequelize.define(
  "Accounts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "Users", key: "id" },
      allowNull: false,
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "Accounts",
    timestamps: true,
    hooks: {
      beforeValidate: async (account) => {
        const lastAccount = await AccountModel.findOne({ order: [["id", "DESC"]], attributes: ["accountNumber"], raw: true });
        let nextNumber = 1;
        
        if (lastAccount && lastAccount.accountNumber) {
          const lastNumberStr = lastAccount.accountNumber.replace("ES", "");
          nextNumber = parseInt(lastNumberStr, 10) + 1;
        }
        
        account.accountNumber = `ES${nextNumber.toString().padStart(6, "0")}`;
        account.balance = 0;
      },
      
      beforeUpdate: (account) => {
        if (account.changed('balance')) {
          const previousBalance = account._previousDataValues.balance;
          const currentBalance = account.getDataValue('balance');

          if (Number(previousBalance) !== Number(currentBalance)) throw new Error("The balance can only be changed through transactions.");
        }

        if (account.changed('accountNumber')) account.accountNumber = account._previousDataValues.accountNumber;
      },
      
      beforeDestroy: (account) => {
        if (Number(account.balance) !== 0) {
            throw new Error("Cannot delete an account with remaining balance.");
        }
      },

    },
  },
);

export default AccountModel;
