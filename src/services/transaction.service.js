import { TransactionsModel } from "../models/index.js";
import { log } from "../utils/utils.js";

async function getAllTransactionsForAccount(accountId) {
  log.red(Object.keys(accountId));
  const transactions = await TransactionsModel.findAll({
    where: { accountId: accountId },
  });
  return transactions;
}

export const transactionServices = { getAllTransactionsForAccount };
export default transactionServices;
