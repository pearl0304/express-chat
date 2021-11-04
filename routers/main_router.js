import { Router } from "express";
import user from "./user_router.js";
const router = Router();

router.get('/',(req,res)=>{res.render('main')})
router.use('/user',user)

export default router