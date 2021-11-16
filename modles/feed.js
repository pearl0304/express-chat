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
       const imagesCollection = await getArticleColletion()
       
       await imagesCollection.insertOne({
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

        const imagesCollection = await getArticleColletion()
        const imagesCursor = imagesCollection.find({index : index, user_id : user_id, reg_dt : reg_dt})
        
        await imagesCursor.forEach(e=>{
            if(e.fileNames){  
                for(let i=0; i<imgCount; i++){
                    selectedImages.push(e.fileNames[i]['fileName'])
                }                
            }
        })
        imagesCursor.close()
        return selectedImages ? selectedImages : ''
    }catch(e){
        console.error(e)
    }
}

export async function deleteSelectImage(data){
    try{
        const fileName = data['fileName']
        const imagesCollection = await getArticleColletion()
        await imagesCollection.updateMany({"fileNames" : {$elemMatch : {fileName:fileName}}},{$pull:{"fileNames" : {"fileName" : fileName}}})

    }catch(e){
        console.error(e)
    }
}


export async function findImagesAfterDelete(data){
    try{
        const user_id = data['user_id']
        const index = data['imageIndex']
        const images = []

        const imagesCollection = await getArticleColletion()
        const imagesCursor = imagesCollection.find({index : index, user_id : user_id},{"fileNames":1,"_id":0})

   

    }catch(e){
        console.error(e)}
}

export async function insertArticles(data){
    try{
        const articlesCollection = await getArticleColletion()
        await articlesCollection.insertOne({
            ...data,
            reg_dt : new Date()
        })
    }catch(e){
        console.error(e)
    }
}






