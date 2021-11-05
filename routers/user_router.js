import { userController } from "../controllers/user_ctrl.js";
import { Router } from "express";
const userRouter = Router()

userRouter.post('/',userController.checkUser)
userRouter.get('/',userController.getUserFeed)

userRouter.get('/register',userController.getRegitser)
userRouter.post('/register',userController.postRegister)



export default userRouter