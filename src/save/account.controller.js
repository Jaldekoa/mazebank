import accountServices from "../../services/account.service.js";

async function getAllUserAccounts(req, res) {
  try {
    const { dni } = req.body;
    const accounts = await accountServices.getAllUserAccounts(dni);
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createNewAccount(req, res) {
  try {
    const { dni, ...accountData } = req.body;
    console.log(dni);
    const newAccount = await accountServices.createNewAccount(dni, accountData);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAccountInfo(req, res) {
  try {
    const { accountNumber } = req.body;
    const account = await accountServices.getAccountInfo(accountNumber);
    res.status(200).json(account);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function changeAccountInfo(req, res) {
  try {
    const { dni, accountNumber, accountData } = req.body;
    const updatedAccount = await accountServices.changeAccountInfo(
      dni,
      accountNumber,
      accountData,
    );
    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteAccount(req, res) {
  try {
    const { dni, accountNumber } = req.body;
    await accountServices.deleteAccount(dni, accountNumber);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export default {
  getAllUserAccounts,
  createNewAccount,
  getAccountInfo,
  changeAccountInfo,
  deleteAccount,
};
