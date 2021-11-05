import MongoClient from "./config.js";
import crypto from "crypto"
var conn = MongoClient.connect()

export async function insertUser(data){
    console.log('inserUser에 도착!')
    const client = await conn 
    const user = client.db("express").collection("users");

    const cipher = crypto.createPrivateKey
    
    await user.insertOne({
        ...data,
        reg_dt : new Date()
    })
}



