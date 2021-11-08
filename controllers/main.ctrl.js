import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()



export const mainController = {
    verifyToken : async(req,res,next)=>{ 

        try{
            const token = req.cookies['jwtToken']
            const secretKey = process.env.SECRET_CODE

            const tokenData = jwt.verify(token,secretKey)

            if(tokenData){
                req.body.usreData = tokenData
                res.render('process/register_process',{result : "SUCCESS", user_id : tokenData['user_id']})
                next()
            }else{
                res.render("main")
            }
        }catch(e){
            console.log(e)  
            res.render("main")   
        }         
    },
}