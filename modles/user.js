import MongoClient from "./config.js";
var conn = MongoClient.connect()

async function getUserColletion(){
    const client = await conn 
    return client.db("express").collection("users");
}

// Check Duplication 
export async function checkDuplicteID(data){

    const user_id_arry =[]

    const input_id= data['user_id']

    const userCollection = await getUserColletion()
    const userIDCursor = userCollection.find({user_id:input_id})

 
    await userIDCursor.forEach(e=>{
        if(e.user_id){
            user_id_arry.push(e.user_id)
        }
    })
    return user_id_arry[0] ? true : false
}

export async function checkDuplicteNick(data){
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
    return user_nick_arry[0] ? true : false
}

// Insert one user
export async function insertUser(data){
    const userCollection = await getUserColletion()
    
    await userCollection.insertOne({
        ...data,
        reg_dt : new Date()
    })
}

// login
export async function login(data){
    console.log('approch login process')

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

    return user_info[0] ? true : false
}







