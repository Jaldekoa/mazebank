import transactionServices from "../../services/transaction.service.js";

async function makeDeposit(req, res) { 
  try {
    const { receiverAccountNumber, amount, details } = req.body;
    const transaction = await transactionServices.createTransaction({
        receiverAccountNumber, amount, details, type: 'DEPOSIT', userId: req.user.id 
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function makeWithdraw(req, res) {
  try {
    const { senderAccountNumber, amount, details } = req.body;
    const transaction = await transactionServices.createTransaction({
        senderAccountNumber, amount, details, type: 'WITHDRAWAL', userId: req.user.id 
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function makeTransfer(req, res) { 
  try {
    const { senderAccountNumber, receiverAccountNumber, amount, details } = req.body;
    const transaction = await transactionServices.createTransaction({
        senderAccountNumber, receiverAccountNumber, amount, details, type: 'TRANSFER', userId: req.user.id 
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllTransactionsForAccount(req, res) {
  try {
    const { accountNumber } = req.params;
    const { limit, page, type, sort } = req.query;

    const data = await transactionServices.getAllTransactionsForAccount(req.user.id, accountNumber, { limit, page, type, sort });
    res.status(200).json(data);
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export default { getAllTransactionsForAccount, makeDeposit, makeWithdraw, makeTransfer };