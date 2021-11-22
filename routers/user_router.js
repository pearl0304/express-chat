import { userController } from "../controllers/user_ctrl.js"
import { Router } from "express"
const userRouter = Router()
import multer from "multer"

const upload = multer({dest:'uploads/'})

userRouter.get('/register',userController.getRegitser)
userRouter.post('/register',upload.single('profile-img'),userController.postRegister)

userRouter.post('/login',userController.postLogin)


export default userRouter