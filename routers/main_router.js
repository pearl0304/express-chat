import { mainController } from "../controllers/main.ctrl.js";
import { Router } from "express";
import user from "./user_router.js";
const router = Router();

router.get('/',mainController.verifyToken)
router.use('/user',user)

export default router