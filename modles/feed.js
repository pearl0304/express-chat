import chalk from "chalk";
import MongoClient from "./config.js";
var conn = MongoClient.connect()

async function getImagesColletion(){
    try{
        const client = await conn 
        return client.db("express").collection("images");
    }catch(e){
        console.error(e)
    }
}

export async function insertImages(data){
    try{
       const imagesCollection = await getImagesColletion()
       
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

        const imagesCollection = await getImagesColletion()
        const imagesCursor = imagesCollection.find({index : index, user_id : user_id, reg_dt : reg_dt})
        
        await imagesCursor.forEach(e=>{
            if(e.fileNames){  
                for(let i=0; i<imgCount; i++){
                    selectedImages.push(e.fileNames[i]['fileName'])
                }                
            }
        })
        return selectedImages ? selectedImages : ''
    }catch(e){
        console.error(e)
    }
}

export async function deleteSelectImage(data){
    try{

        console.log('delData', data)
        const index = data['index']
        const user_id = data['user_id']
        const fileName = data['fileName']

        const imagesCollection = await getImagesColletion()
        imagesCollection.updateOne({"fileNames" : {$elemMatch : {fileName:fileName}}},{$pull:{"fileNames" : {"fileName" : fileName}}})

    }catch(e){
        console.error(e)
    }
}




