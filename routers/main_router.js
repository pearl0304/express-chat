import { mainController } from "../controllers/main.ctrl.js";
import { Router } from "express";
import user from "./user_router.js";
import feed from "./feed_router.js"
const router = Router();

router.get('/',mainController.verifyToken,mainController.stayUserFeed)
router.use('/user',user)
router.use('/feed',feed)

export default router