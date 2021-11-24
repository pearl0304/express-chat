import MongoClient from "./config.js";
var conn = MongoClient.connect()

async function getUserColletion(){
    try{
        const client = await conn 
        return client.db("express").collection("users");
    }catch(e){
        console.error(e)
    }
}

// Check Duplication 
export async function checkDuplicteID(data){
    try{
        const user_id_arry =[]

        const input_id= data['user_id']
    
        const userCollection = await getUserColletion()
        const userIDCursor = userCollection.find({user_id:input_id})
    
     
        await userIDCursor.forEach(e=>{
            if(e.user_id){
                user_id_arry.push(e.user_id)
            }
        })
        userIDCursor.close()
        return user_id_arry[0] ? true : false
    }catch(e){
        console.error(e)
    }
}

export async function checkDuplicteNick(data){
    try{
        const input_nick= data['user_nick']
        const user_nick_arry =[]
    
        const userCollection = await getUserColletion()
        const userNickCursor = userCollection.find({
            user_nick:input_nick
        })
    
    
        await userNickCursor.forEach(e=>{
            if(e.user_nick){
                user_nick_arry.push(e.user_nick)
            }
        })
        userNickCursor.close()
        return user_nick_arry[0] ? true : false
    }catch(e){
        console.error(e)
    }
}

// Insert one user
export async function insertUser(data){

    try{
        const userCollection = await getUserColletion()
    
        await userCollection.insertOne({
            ...data,
            reg_dt : new Date()
        })
    }catch(e){
        console.error(e)}
}

// login
export async function login(data){
    try{
        const user_info =[]
        const input_id = data['user_id']
        const input_pw = data['user_pw']
    
        const userCollection = await getUserColletion()
        const userCursor = userCollection.find({
            user_id : input_id, 
            user_pw : input_pw
        })
    
        await userCursor.forEach(e=>{
            if(e.user_id && e.user_pw){
                user_info.push(e.user_id, e.user_nick)
            }
        })
        userCursor.close()
        return user_info[0] ? true : false
    }catch(e){
        console.error(e)}
}

// After login get user nick
export async function findNickName(user_id){
    try{
        const user_nick =[] 

        const userCollection = await getUserColletion()
        const userCursor = userCollection.find({user_id : user_id})
        await userCursor.forEach(e=>{
            if(e.user_nick){
                user_nick.push(e.user_nick)
            }
        })
        userCursor.close()
        return user_nick[0] ? user_nick[0] : ''
    }catch(e){
        console.error(e)
    }
}

export async function findProfile(user_id){
    try{
        const profile = [] 

        const userCollection = await getUserColletion()
        const userCursor = userCollection.find({user_id : user_id})
        
        await userCursor.forEach(e=>{
            if(e.profile_img){
                profile.push(e.profile_img)
            }
        })
        userCursor.close()
        return profile[0] ? profile[0] : ""
    }catch(e){
        console.error(e)
    }
}







