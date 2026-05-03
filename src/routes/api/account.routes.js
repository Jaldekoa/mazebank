import accountController from "../../controllers/api/account.controller.js";
import { Router } from "express";

const accountRouter = Router();

accountRouter.get("/", accountController.getAllUserAccounts);
accountRouter.post("/", accountController.createNewAccount);
accountRouter.get("/:id", accountController.getAccountInfo);
accountRouter.patch("/:id", accountController.changeAccountInfo);
accountRouter.delete("/:id", accountController.deleteAccount);

export default accountRouter;
