import { AccountModel } from "../models/index.js";

async function getAllUserAccounts(userId) {
    return await AccountModel.findAll({ where: { userId } });
}

async function createNewAccount(userId, accountData) {
    const { accountName } = accountData;
    return await AccountModel.create({ accountName, userId });
}

async function getAccountInfo(userId, accountNumber) {
    const account = await AccountModel.findOne({ where: { accountNumber, userId } });
    if (!account) throw new Error("Account not found or access denied");
    return account;
}

async function changeAccountInfo(userId, accountNumber, updateData) {
    const account = await AccountModel.findOne({ where: { accountNumber, userId } });
    if (!account) throw new Error("Account not found or access denied");

    const { accountName } = updateData;
    if (accountName) account.accountName = accountName;
    await account.save();
    return await AccountModel.findOne({ where: { accountNumber, userId } });
}

async function deleteAccount(userId, accountNumber) {
    const account = await AccountModel.findOne({ where: { accountNumber, userId } });
    if (!account) throw new Error("Account not found or access denied");
    await account.destroy();
}

export const accountService = { getAllUserAccounts, createNewAccount, getAccountInfo, changeAccountInfo, deleteAccount };
export default accountService;