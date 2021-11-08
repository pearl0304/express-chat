import { userController } from "../controllers/user_ctrl.js";
import { Router } from "express";
const userRouter = Router()



userRouter.get('/register',userController.getRegitser)
userRouter.post('/register',userController.postRegister)

userRouter.post('/login',userController.postLogin)

userRouter.get('/feed:user_id',userController.getFeed)


export default userRouter