import transactionServices from "../../services/transaction.service.js";

async function getAllTransactionsForAccount(req, res) {
  const data = await transactionServices.getAllTransactionsForAccount(
    req.params.userId,
  );
  return res.json(data);
}

export const transactionController = { getAllTransactionsForAccount };
export default transactionController;
