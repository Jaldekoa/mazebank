import { Router } from "express";
import userController from "../../controllers/api/user.controller.js";

const userRouter = Router();

userRouter.get("/register", userController.register);
userRouter.post("/login", userController.login);

userRouter.get("/me", userController.getMyUserInfo);
userRouter.patch("/me", userController.changeMyUserInfo);

export default userRouter;
