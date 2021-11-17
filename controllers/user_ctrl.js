import {checkDuplicteID,checkDuplicteNick,insertUser,login,findNickName } from "../modles/user.js"
import jwt from "jsonwebtoken"
export const userController = {

    // register
    getRegitser:async(req,res)=>{
        try{
            await res.render('register')  
        }catch(e){
            console.error(e)
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

                // Duplicate
                const resultDuplicatedID = await checkDuplicteID(data)
 
                if(resultDuplicatedID){
                    res.render('process/register_process',{result:"DUPLICATE_ID"})
                    return false
                }
    
                const resultDupilcatedNick = await checkDuplicteNick(data)
                if(resultDupilcatedNick){
                    res.render('process/register_process',{result:"DUPLICATE_NICK"})
                    return false
                }

                // insert User
                await insertUser(data)

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
    
                //save a token in cookie
                res.cookie('jwtToken',created_token);
                req.body.userData={user_id: data['user_id'], user_nick: data['user_nick']}
                req.statusResult = 'Login Success'
                console.log('register token save complete!');
                res.render('process/register_process', {result : "SUCCESS", user_id:data['user_id']})
                return;
            }else{
                res.render('process/register_process', { result: "EMPTY_REGISTER_INFO" });    
            }

        }catch(e){
            console.error(e)
        }
    },

    postLogin : async (req,res)=>{

        try{

            const data = {
                user_id : req.body.user_id,
                user_pw : req.body.user_pw,
            }

            if(data){

                // Check user is our member
                const isJoindedId = await checkDuplicteID(data)
            
                if(isJoindedId === false){
                    res.render('process/register_process', { result: "IS_NOT_USER" })
                    return false
                }

                const result =await login(data)
                
                if(result){

                    const user_nick = await findNickName(data['user_id'])                    
                    const created_token = jwt.sign(
                        {
                            user_id: data['user_id'], user_nick: user_nick
                        }
                        , process.env.SECRET_CODE,
                        {
                            expiresIn: '50m'
                        }
                    )
                    console.log('token check: ', created_token);

                    //save a token in cookie
                    res.cookie('jwtToken',created_token);
                    req.body.userData={user_id: data['user_id'], user_nick: user_nick}
                    req.statusResult = 'Login Success'
                    console.log('register token save complete!')
                    res.render('process/register_process', {result : "SUCCESS", user_id:data['user_id']})
                    return;
                }else{
                    res.render('process/register_process', { result: "WRONG_PW" })
                }

            }else{
                res.render('process/register_process', { result: "EMPTY_LOGIN_INFO" })
            }
            

        }catch(e){
            console.error(e)
        }
    },

    getFeedParm : (req,res)=>{

    },

    getFeed : async(req,res)=>{
        try{
            // DB에 있는 글 가지고 오기
            res.render('feed')
        }
       catch(e){
           console.error(e)
       }
    }    
}