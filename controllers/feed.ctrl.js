import chalk from "chalk"
import { insertImages,findImages,deleteSelectImage} from "../modles/feed.js"
export const feedController = {

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
                        fileNames :fileNames,
                        reg_dt : new Date()
                    }        
                    await insertImages(data)
                    const selectedImages = await findImages(data)
                    res.render('upload',{selectedImages, user_id, index : data['index'], result :"img"})

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
                index : index,
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
            console.log(req.body.userData)
            const text = req.body.text

    
 
        }catch(e){
            console.error(e)
        }
    }
}