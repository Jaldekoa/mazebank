import { AccountModel, UserModel } from "../models/index.js";

async function getAllUserAccounts(dni) {
    return await AccountModel.findAll({ where: { dni } });
};

async function createNewAccount(dni, accountData) {
    const user = await UserModel.findOne({ where: { dni } });
    return await AccountModel.create({ ...accountData, userId: user.id });
};

async function getAccountInfo(accountNumber) {
    const account = await AccountModel.findOne({ where: { accountNumber } });
    if (!account) throw new Error("Account not found or access denied");
    return account;
}

async function changeAccountInfo(dni, accountNumber, accountData) {
    const user = await UserModel.findOne({ where: { dni } });
    const account = await AccountModel.findOne({ where: { accountNumber, userId: user.id } });
    if (!account) throw new Error("Account not found or access denied"); 
    
    return await account.update(updateData);
}

async function deleteAccount(dni, accountNumber) {
    const user = await UserModel.findOne({ where: { dni } });
    const account = await AccountModel.findOne({ where: { accountNumber, userId: user.id } });
    if (!account) throw new Error("Account not found or access denied");

    await account.destroy();
}

export const accountService = { getAllUserAccounts, createNewAccount, getAccountInfo, changeAccountInfo, deleteAccount };
export default accountService;