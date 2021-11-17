import chalk from "chalk"
import { insertImages,findImages,deleteSelectImage,findFinalImages,insertText,insertOnlyText} from "../modles/upload.js"
import { getAllArticles } from "../modles/feed.js"
export const feedController = {

    getFeedParm : (req,res)=>{

    },

    getFeed : async(req,res)=>{
        try{
            const articles = await getAllArticles()
            res.render('feed')
        }
       catch(e){
           console.error(e)
       }
    },
        
    getphoto : async(req,res)=>{
        try{
            res.render('photo')
        }catch(e){
            console.error(e)
        }
        
    },
    imageUpload : async(req,res)=>{
        try{
            const user_id= req.body.userData['user_id'] 
            const user_nick = req.body.userData['user_nick']     
            const {files} = req;

            const fileNames = [];
            for (const key in files) {
                if (Object.hasOwnProperty.call(files, key)) {
                    const fileName = files[key].filename;
                    fileNames.push({fileName :fileName})          
                }
            }
                if(fileNames.length >0){
                    const data = {
                        index : Math.random(),
                        user_id : user_id,
                        user_nick : user_nick,
                        fileNames :fileNames,
                        text : '',
                        reg_dt : new Date()
                    }        
                    await insertImages(data)
                    const selectedImages = await findImages(data)
                    res.render('upload',{selectedImages, user_id,index : data['index'], result :"img"})

                }else{
                    res.render('upload',{result:"text"})
                }
        
        }catch(e){
            console.error(e)
        }
    },
    deleteSelectImage : async (req,res)=>{
        try{
            const index = req.body.index
            const user_id = req.body.user_id
            const seletedImage = req.body.seletedImage
    
            const delData = {
                index : Number(index),
                user_id : user_id,
                fileName : seletedImage    
            }
            await deleteSelectImage(delData)
            res.send(seletedImage)
    
        }catch(e){
            console.error(e)
        }
    },
    uploadArticle : async(req,res)=>{
        try{
            const user_id = req.body.userData['user_id']
            const user_nick = req.body.userData['user_nick']
            const imageIndex = req.body.imageIndex
            const text = req.body.text 
    
            if(imageIndex){
                const data = {
                    user_id : user_id,
                    index: Number(imageIndex),
                    text : text     
                }
                const finalImage =await findFinalImages (data)
                await insertText(data)
                res.send('sucess')
                //res.render('feed',{user_id, user_nick, text,finalImage, index : data['index'], result : 'img'})
            }else{
                const data = {
                    index:Math.random(),
                    user_id : user_id,
                    user_nick : user_nick,
                    text : text 
                }
                await insertOnlyText(data)
                res.send('sucess')
               // res.render('feed',{user_id, user_nick, text, index : data['index']})
            }
        }catch(e){
            console.error(e)
        }
    },
}