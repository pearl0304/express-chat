import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const mainController = {
    stayUserFeed : async(req,res)=>{
    
        try{
            const token = req.cookies['jwtToken']
            const secretKey = process.env.SECRET_CODE
            const tokenData = jwt.verify(token,secretKey)
            
            if(tokenData){
                req.body.userData = tokenData
                res.render('process/register_process',{result : "SUCCESS", user_id : tokenData['user_id']})
            }
        }catch(e){
            console.error(e)
            res.render("main")
        }  
    },
    getTokendata : async (req,res,next)=>{
        try{
            const token = req.cookies['jwtToken']
            const secretKey = process.env.SECRET_CODE
            const tokenData = jwt.verify(token,secretKey)

            if(token){
                req.body.userData = tokenData
                next()
            }else{
                res.render('process/register_process',{result : "TOKEN_EXPIRE"})
            }

        }catch(e){
            res.render("main")
        }
    }
}