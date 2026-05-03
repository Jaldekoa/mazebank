import sequelize from "../config/db.js";
import { AccountModel, TransactionsModel } from "../models/index.js";
import { Op } from "sequelize";

async function createTransaction({ senderAccountNumber, receiverAccountNumber, amount, details, type, userId }) {
    const t = await sequelize.transaction();

    try {
        let [senderAccount, receiverAccount] = [null, null];
        const amountNum = Number(amount);

        if (amountNum <= 0) throw new Error("Amount must be greater than 0");

        if (type === 'WITHDRAWAL' || type === 'TRANSFER') {
            senderAccount = await AccountModel.findOne({ 
                where: { accountNumber: senderAccountNumber, userId }, 
                transaction: t, 
                lock: true 
            });

            if (!senderAccount) throw new Error("Sender account not found or access denied");
            if (Number(senderAccount.balance) < amountNum) throw new Error("Insufficient funds");

            await senderAccount.increment('balance', { by: -amountNum, transaction: t });            
            await senderAccount.reload({ transaction: t });
        }

        if (type === 'DEPOSIT' || type === 'TRANSFER') {
            receiverAccount = await AccountModel.findOne({ 
                where: { accountNumber: receiverAccountNumber }, 
                transaction: t, 
                lock: true 
            });

            if (!receiverAccount) throw new Error("Receiver account not found");

            await receiverAccount.increment('balance', { by: amountNum, transaction: t });
            await receiverAccount.reload({ transaction: t });
        }

        const newTransaction = await TransactionsModel.create({
            senderAccountId: senderAccount?.id || null,
            receiverAccountId: receiverAccount?.id || null,
            amount: amountNum,
            details,
            type
        }, { transaction: t });

        await t.commit();
        return newTransaction;

    } catch (error) {
        await t.rollback();
        throw error;
    }
}

async function getAllTransactionsForAccount(userId, accountNumber, options = {}) {
    const { limit = 10, page = 1, type, sort = 'DESC' } = options;

    const account = await AccountModel.findOne({ where: { accountNumber, userId } });
    if (!account) throw new Error("Account not found");

    const offset = (page - 1) * limit;
    const whereConditions = { [Op.or]: [{ senderAccountId: account.id }, { receiverAccountId: account.id }] };
    if (type) whereConditions.type = type;

    const { count, rows } = await TransactionsModel.findAndCountAll({
        where: whereConditions,
        limit: Number(limit),
        offset: Number(offset),
        order: [['createdAt', sort]],
    });

    return {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page),
        transactions: rows
    };
}

export default { createTransaction, getAllTransactionsForAccount };