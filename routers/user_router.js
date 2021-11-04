import { userController } from "../controllers/user_ctrl.js";
import { Router } from "express";
const userRouter = Router()


userRouter.get('/',userController.getUserfeed)

export default userRouter