import { feedController } from "../controllers/feed.ctrl.js"
import { Router } from "express"
const feedRouter = Router()

feedRouter.get('/photo',feedController.getphoto)
feedRouter.post('/photo',feedController.postphoto)


export default feedRouter