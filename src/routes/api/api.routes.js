import { Router } from "express";
import userRouter from "./user.routes.js";
import accountRouter from "./account.routes.js";
import transactionRouter from "./transaction.routes.js";

const apiRouter = Router();
apiRouter.use("/user", userRouter);
apiRouter.post("/auth", userRouter);
apiRouter.use("/account", accountRouter);
apiRouter.use("/transaction", transactionRouter);

export default apiRouter;
