import { TransactionsModel } from "../models/index.js";

const getAllTransactionsForAccount(accountId) {
    const transactions = await TransactionsModel.findAll({where: {}})
};