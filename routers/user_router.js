import { userController } from "../controllers/user_ctrl.js";
import { Router } from "express";
const userRouter = Router()

userRouter.post('/',userController.checkUser)
userRouter.get('/',userController.getUserFeed)

userRouter.get('/register',userController.getRegitser)
userRouter.post('/register',userController.postRegister)

userRouter.get('/feed:id', (req,res)=> {res.send('피드')})


export default userRouter