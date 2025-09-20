import { Router } from "express"
import { validateRequest } from "../middlewares/validateRequest";
import { UserSchema } from "../validations/user.validation";
import { UserController } from "../controllers/user.controller";
import { checkAuth } from "../middlewares/checkAuth";
import { Role } from "../interfaces/user.interface";
const router = Router();


router.post("/register", validateRequest(UserSchema), UserController.createUser)
router.get("/profile", checkAuth(Role.admin, Role.moderator, Role.member), UserController.getUserProfile)

export const UserRoutes = router