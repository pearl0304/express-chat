import chalk from "chalk"
import { insertImages,findImages } from "../modles/feed.js"
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
                    const element = files[key];
                    const fileName = element.filename  
                    fileNames.push(fileName)               
                }
            }
                if(fileNames.length >0){
                    const data = {
                        index : Math.random(),
                        user_id : user_id,
                        fileNames : fileNames,
                        reg_dt : new Date()
                    }        
                    await insertImages(data)
                    const selectedImages = await findImages(data)

                    res.render('upload',{selectedImages})

                }else{
                    console.log('파일 없음')
                }
            
            //res.render('process/upload_process', {statusCode : 200})

        }catch(e){
            console.error(e)
        }
    }
}