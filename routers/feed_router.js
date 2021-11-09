import { mainController } from "../controllers/main.ctrl.js"
import { feedController } from "../controllers/feed.ctrl.js"
import { Router } from "express"
const feedRouter = Router()
import multer from "multer"

const upload = multer({dest:'uploads/'})

feedRouter.get('/photo',mainController.verifyToken,feedController.getphoto)
feedRouter.post('/photo',upload.array('imgUpload',5),mainController.getTokendata,feedController.imageUpload)


export default feedRouter