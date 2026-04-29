import { Router } from "express";
import transactionController from "../../controllers/api/transaction.controller.js";

const transactionRouter = Router();

transactionRouter.get("/:userId", transactionController.getAllTransactionsForAccount);

export default transactionRouter;
