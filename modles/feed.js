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
       
        var articles = []
        var article = []
        const articleCollection = await getArticleColletion()
        const articleCursor = articleCollection.find().sort({"reg_dt":-1}).limit(20)

        await articleCursor.forEach(e=>{
            article['index'] = e.index
            article['user_id']= e.user_id
            article['user_nick'] = e.user_nick
            article['text'] = e.text
            article['reg_dt'] = e.reg_dt 
            article['img'] = []

            if(e.fileNames){
                const imageCount = e.fileNames.length
                for(let i=0; i<imageCount; i++){
                    article['img'].push(e.fileNames[i]['fileName']) 
                }
            }
        })
       


      
      // return articles 
    }
    catch(e){
        console.error(e)
    }
}

