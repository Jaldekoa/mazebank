import { Router } from "express";
import userRouter from "./user.routes";
import accountRouter from "./account.routes";
import transactionRouter from "./transaction.routes";

const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/account", accountRouter);
apiRouter.use("/transaction", transactionRouter);

export default apiRouter;
