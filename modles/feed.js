import chalk from "chalk";
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

export async function insertImages(data){
    try{
       const articlesCollection = await getArticleColletion()
       
       await articlesCollection.insertOne({
           ...data,          
       })
        console.log('insert Images 성공')

    }catch(e){
        console.error(e)
    }
}

export async function findImages(data){
    try{
        const index = data['index']
        const user_id = data['user_id']
        const reg_dt = data['reg_dt']
        const selectedImages = []
        const imgCount = data['fileNames'].length

        const articlesCollection = await getArticleColletion()
        const articlesCursor = articlesCollection.find({index : index, user_id : user_id, reg_dt : reg_dt})
        
        await articlesCursor.forEach(e=>{
            if(e.fileNames){  
                for(let i=0; i<imgCount; i++){
                    selectedImages.push(e.fileNames[i]['fileName'])
                }                
            }
        })
        articlesCursor.close()
        return selectedImages ? selectedImages : ''
    }catch(e){
        console.error(e)
    }
}

export async function deleteSelectImage(data){
    try{
        const fileName = data['fileName']
        const articlesCollection = await getArticleColletion()
        await articlesCollection.updateMany({"fileNames" : {$elemMatch : {fileName:fileName}}},{$pull:{"fileNames" : {"fileName" : fileName}}})

    }catch(e){
        console.error(e)
    }
}


export async function findFinalImages(data){
    try{
        const user_id = data['user_id']
        const index = Number(data['index'])
        const images = []

        const articlesCollection = await getArticleColletion()
        const articlesCursor = articlesCollection.find({index : index, user_id : user_id},{"fileNames":1,"_id":0})
       
        await articlesCursor.forEach(e=>{
            if(e.fileNames){
                const imageCount = e.fileNames.length
                for(let i=0; i<imageCount; i++){
                    images.push(e.fileNames[i]['fileName']) 
                }
            }
        })
        return images

    }catch(e){
        console.error(e)}
}

export async function insertText(data){
    try{
        const user_id = data['user_id']
        const index = Number(data['index'])
        const text = data['text']

        const articlesCollection = await getArticleColletion()
        await articlesCollection.updateOne({index:index, user_id:user_id},{$set:{text:text}})
        
    }catch(e){
        console.error(e)
    }
}






