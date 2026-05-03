import accountServices from "../../services/account.service.js";

async function getAllUserAccounts(req, res) {
  try {
    const accounts = await accountServices.getAllUserAccounts(req.user.id);
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createNewAccount(req, res) {
  try {
    const newAccount = await accountServices.createNewAccount(req.user.id, req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAccountInfo(req, res) {
  try {
    const account = await accountServices.getAccountInfo(req.user.id, req.params.accountNumber);
    res.status(200).json(account);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function changeAccountInfo(req, res) {
  try {
    const updatedAccount = await accountServices.changeAccountInfo(req.user.id, req.params.accountNumber, req.body);
    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteAccount(req, res) {
  try {
    await accountServices.deleteAccount(req.user.id, req.params.accountNumber);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const accountController = { getAllUserAccounts, createNewAccount, getAccountInfo, changeAccountInfo, deleteAccount };
export default accountController;