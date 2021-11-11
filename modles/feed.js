import MongoClient from "./config.js";
var conn = MongoClient.connect()

async function getImagesColletion(){
    const client = await conn 
    return client.db("express").collection("images");
}

export async function insertImages(data){
    console.log('modles!')
   // const imagesCollection = await getImagesColletion()
    console.log(data)





}

