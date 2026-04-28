import UserModel from "./user.model.js";
import AccountModel from "./account.model.js";
import TransactionsModel from "./transaction.model.js";

UserModel.hasMany(AccountModel, { foreignKey: "userId" });
AccountModel.belongsTo(UserModel, { foreignKey: "userId" });

AccountModel.hasMany(TransactionsModel, {
  as: "SentTransactions",
  foreignKey: "senderAccountId",
});
TransactionsModel.belongsTo(AccountModel, {
  as: "Sender",
  foreignKey: "senderAccountId",
});

AccountModel.hasMany(TransactionsModel, {
  as: "ReceivedTransactions",
  foreignKey: "receiverAccountId",
});
TransactionsModel.belongsTo(AccountModel, {
  as: "Receiver",
  foreignKey: "receiverAccountId",
});

export { UserModel, AccountModel, TransactionsModel };
