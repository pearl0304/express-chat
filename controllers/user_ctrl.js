import { insertUser } from "../modles/user.js"
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
            insertUser(data)
            res.render('feed')


        }catch(e){
            console.log(e)
        }
    }
    
}