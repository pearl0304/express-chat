import MongoClient from "./config.js";
var conn = MongoClient.connect()
import {findProfile} from "./user.js"

async function getArticleColletion(){
    try{
        const client = await conn 
        return client.db("express").collection("articles");
    }catch(e){
        console.error(e)
    }
}

async function getCommentColletion(){
    try{
        const client = await conn 
        return client.db("express").collection("comment");
    }catch(e){
        console.error(e)
    }
}

export async function findAllArticles(){
    try{
        const articleCollection = await getArticleColletion()
        const articleCursor = await articleCollection.find().sort({"reg_dt":-1}).limit(20).toArray()
        for(let i=0; i<articleCursor.length; i++){
            const profile = await findProfile(articleCursor[i]['user_id'])
            articleCursor[i]['profile'] = profile 
            if(articleCursor[i]['fileNames']){
                const fileName = []
                const fileNames = articleCursor[i]['fileNames']
                for(let j=0; j<fileNames.length; j++){                   
                    fileName.push(fileNames[j]['fileName'])
                }
                articleCursor[i]['imgs']= fileName
            }
        }
        return articleCursor      
    }
    catch(e){
        console.error(e)
    }
}

export async function findArticle(index){
    try{
        const articleCollection = await getArticleColletion()
        const artilceCursor = await articleCollection.findOne({index:index})
        const profile = await findProfile(artilceCursor['user_id'])
        artilceCursor['profile'] = profile 
        return artilceCursor
            
    }catch(e){
        console.error(e)
    }
}

export async function findComments(index){
    try{
        const commentCollection = await getCommentColletion()
        const commentCursor = await commentCollection.find({articleIndex: index}).sort({"reg_dt":-1}).limit(10).toArray()
        const commentCount = await commentCollection.find({articleIndex: index}).sort({"reg_dt":-1}).count()
        commentCursor['count'] = commentCount

        for(let i=0; i<commentCursor.length; i++){
            const profile = await findProfile(commentCursor[i]['user_id'])
            commentCursor[i]['profile'] = profile 
        }

        return commentCursor

    }catch(e){
        console.error(e)
    }
}

export async function insertComments(data){
    try{
        const commentCollection = await getCommentColletion()
        await commentCollection.insertOne({
            ...data,
        })
    }catch(e){

    }
}




