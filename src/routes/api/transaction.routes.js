import { Router } from "express";
import transactionController from "../../controllers/api/transaction.controller.js";

const transactionRouter = Router();

transactionRouter.get("/:userId", transactionController.getAllTransactionsForAccount);
transactionRouter.post("/deposit", transactionController.makeDeposit);
transactionRouter.post("/withdraw", transactionController.makeWithdraw);
transactionRouter.post("/transfer", transactionController.makeTransfer);

export default transactionRouter;
