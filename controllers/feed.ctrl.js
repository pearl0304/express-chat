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

            console.log(files)
           // await insertImages(data)

        }catch(e){
            console.error(e)
        }
    }
}