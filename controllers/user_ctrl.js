import { insertUser } from "../modles/user.js"
import jwt from "jsonwebtoken"
export const userController = {

    // main - login
    checkUser:async(req,res)=>{
        try{
            await res.send('loin post 처리')
        }catch(e){
            console.log(e)
        }
    },
    getUserFeed:async(req,res)=>{
        try{        
            await res.render('feed')
        }catch(e){
            console.log(e)
        } 
    },

    // register
    getRegitser:async(req,res)=>{
        try{
            await res.render('register')  
        }catch(e){
            console.log(e)
        }
    },

    postRegister:async(req,res)=>{
        try{
            const data = {
                user_id : req.body.user_id,
                user_nick : req.body.user_nick,
                user_pw : req.body.user_pw,
            }

            if(data){
                insertUser(data)

                // create token
                const created_token = jwt.sign(
                    {
                        user_id: data['user_id'], user_nick: data['user_nick']
                    }
                    , process.env.SECRET_CODE,
                    {
                        expiresIn: '50m'
                    }
                )
                console.log('token check: ', created_token);
    
                // save a token in cookie
                res.cookie('jwtToken',created_token);
                console.log('register token save complete!');
                res.render('process/register_process', {result : "SUCCESS", user_id:data['user_id']})
                return;
            }else{
                res.render('process/register_process', { result: "ERROR" });    
            }


            

           


        }catch(e){
            console.log(e)
        }
    }
    
}