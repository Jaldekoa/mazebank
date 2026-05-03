import userController from "../../controllers/api/user.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);

userRouter.get("/me", authMiddleware, userController.getMyUserInfo);
userRouter.patch("/me", authMiddleware, userController.changeMyUserInfo);
userRouter.delete("/me", authMiddleware, userController.deleteMyUser);

export default userRouter;
