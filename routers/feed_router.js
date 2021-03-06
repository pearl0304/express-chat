import { mainController } from "../controllers/main.ctrl.js"
import { feedController } from "../controllers/feed.ctrl.js"
import { Router } from "express"
const feedRouter = Router()
import multer from "multer"

const upload = multer({dest:'uploads/'})

feedRouter.get('/',mainController.getTokendata,feedController.getFeed)

feedRouter.get('/photo',mainController.getTokendata,feedController.getphoto)
feedRouter.post('/photo',mainController.getTokendata,upload.array('imgUpload',5),mainController.getTokendata,feedController.imageUpload)

feedRouter.post('/imgedel',mainController.getTokendata,feedController.deleteSelectImage)

feedRouter.post('/article',mainController.getTokendata,feedController.uploadArticle)

feedRouter.get('/comment/:index',mainController.getTokendata,feedController.getComment)
feedRouter.post('/comment',mainController.getTokendata,feedController.insertComment)

export default feedRouter