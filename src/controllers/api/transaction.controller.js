import transactionServices from "../../services/transaction.service.js";

async function createTransaction(req, res) {
  try {
    const { senderAccountId, receiverAccountId, amount, details } = req.body;
  
    const transaction = await transactionServices.createTransaction(senderAccountId, receiverAccountId, amount, details);
    return res.status(201).json(transaction);
  
  } catch (error) {
    
    return res.status(400).json(error.message);
  };
}

async function getAllTransactionsForAccount(req, res) {
  const data = await transactionServices.getAllTransactionsForAccount(
    req.params.userId,
  );
  return res.status(200).json(data);
}

export const transactionController = { getAllTransactionsForAccount, createTransaction };
export default transactionController;
