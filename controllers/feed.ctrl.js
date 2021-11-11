import { insertImages } from "../modles/feed.js"
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
            res.render('upload',{
                fileNames : fileNames,
            })
        }catch(e){
            console.error(e)
        }
    }
}