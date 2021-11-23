import MongoClient from "./config.js";
var conn = MongoClient.connect()

async function getArticleColletion(){
    try{
        const client = await conn 
        return client.db("express").collection("articles");
    }catch(e){
        console.error(e)
    }
}

export async function getAllArticles(){
    try{
        const articleCollection = await getArticleColletion()
        const articleCursor = articleCollection.find().sort({"reg_dt":-1}).limit(20).toArray()

       return articleCursor
    }
    catch(e){
        console.error(e)
    }
}

