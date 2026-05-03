import accountController from "../../controllers/api/account.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { Router } from "express";

const accountRouter = Router();
accountRouter.use(authMiddleware);

accountRouter.get("/", accountController.getAllUserAccounts);
accountRouter.post("/", accountController.createNewAccount);
accountRouter.get("/:accountNumber", accountController.getAccountInfo);
accountRouter.patch("/:accountNumber", accountController.changeAccountInfo);
accountRouter.delete("/:accountNumber", accountController.deleteAccount);

export default accountRouter;
