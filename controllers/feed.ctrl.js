export const feedController = {

    getphoto : async(req,res)=>{
        try{
            res.render('photo')
        }catch(e){
            console.error(e)
        }
        
    },
    postphoto : (req,res)=>{
        try{
            res.send('사진 업로드 처리')
        }catch(e){
            console.error(e)
        }
    }
}