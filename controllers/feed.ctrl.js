export const feedController = {

    getphoto : (req,res)=>{
        res.render('photo')
    },

    postphoto : (req,res)=>{
        res.send('사진 업로드 처리')
    }
}