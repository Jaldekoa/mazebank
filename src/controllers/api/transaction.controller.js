import transactionServices from "../../services/transaction.service.js";

async function makeDeposit(req, res) { 
  try {
    const { receiverAccountId, amount, details } = req.body;
    const transaction = await transactionServices.createTransaction(null, receiverAccountId, amount, details);
    return res.status(201).json(transaction);

  } catch (error) {
    return res.status(400).json();
  };
};

async function makeWithdraw(req, res) {
  try {
    const { senderAccountId, amount, details } = req.body;
    const transaction = await transactionServices.createTransaction(senderAccountId, null, amount, details);
    return res.status(201).json(transaction);

  } catch (error) {
    return res.status(400).json();
  };
 };

async function makeTransfer(req, res) { 
  try {
    const { senderAccountId, receiverAccountId, amount, details } = req.body;
    const transaction = await transactionServices.createTransaction(senderAccountId, receiverAccountId, amount, details);
    return res.status(201).json(transaction);

  } catch (error) {
    return res.status(400).json();
  };
};

async function getAllTransactionsForAccount(req, res) {
  const data = await transactionServices.getAllTransactionsForAccount(req.params.userId);
  return res.status(200).json(data);
}

export const transactionController = { getAllTransactionsForAccount, makeDeposit, makeWithdraw, makeTransfer };
export default transactionController;
