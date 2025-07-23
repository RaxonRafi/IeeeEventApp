import { Router } from "express"
import { validateRequest } from "../middlewares/validateRequest";
import { UserSchema } from "../validations/user.validation";
import { UserController } from "../controllers/user.controller";
export const userRouter = Router();


userRouter.post("/register",validateRequest(UserSchema),UserController.createUser)

