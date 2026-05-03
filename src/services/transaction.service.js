import sequelize from "../config/db.js";
import { AccountModel, TransactionsModel } from "../models/index.js";
import { log } from "../utils/utils.js";
import { Op } from "sequelize";

async function createTransaction(senderAccountId, receiverAccountId, amount, details) {
  const transaction = await sequelize.transaction();

  try {
    const senderAccount = await AccountModel.findByPk(senderAccountId, {transaction: transaction, lock: true});
    const receiverAccount = await AccountModel.findByPk(receiverAccountId, {transaction: transaction, lock: true});
  
    await senderAccount.update({ balance: Number(senderAccount.balance) - Number(amount) });
    await receiverAccount.update({ balance: Number(receiverAccount.balance) + Number(amount) });
  
    const newTransaction = await TransactionsModel.create({ senderAccountId, receiverAccountId, amount, details, type: 'TRANSFER' }, { transaction: transaction });
    await transaction.commit();

    return newTransaction;
  } catch (error) {
    await transaction.rollback();
  };
};

async function getAllTransactionsForAccount(accountId) {
  const transactions = await TransactionsModel.findAll({
    where: {
      [Op.or]: [{ senderAccountId: accountId }, { receiverAccountId: accountId }],
    },
  });
  return transactions;
}

export const transactionServices = { getAllTransactionsForAccount, createTransaction };
export default transactionServices;
