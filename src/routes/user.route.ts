import { Router } from "express"
import { validateRequest } from "../middlewares/validateRequest";
import { UserSchema } from "../validations/user.validation";
import { UserController } from "../controllers/user.controller";
const router = Router();


router.post("/register",validateRequest(UserSchema),UserController.createUser)

export const UserRoutes = router