import { userController } from "../controllers/user_ctrl.js";
import { Router } from "express";
const userRouter = Router()

userRouter.get('/register',userController.getRegitser)
userRouter.post('/register',userController.postRegister)

userRouter.post('/login',userController.postLogin)


export default userRouter