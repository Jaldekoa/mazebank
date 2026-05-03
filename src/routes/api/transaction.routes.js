import { Router } from "express";
import transactionController from "../../controllers/api/transaction.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js"

const transactionRouter = Router();
transactionRouter.use(authMiddleware);

transactionRouter.get("/:accountNumber", transactionController.getAllTransactionsForAccount);
transactionRouter.post("/deposit", transactionController.makeDeposit);
transactionRouter.post("/withdraw", transactionController.makeWithdraw);
transactionRouter.post("/transfer", transactionController.makeTransfer);

export default transactionRouter;
