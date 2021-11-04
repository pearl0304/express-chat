export const userController = {

    // @post 
    checkUser:(req,res)=>{
        res.send('post 처리')
    },

    // @get
    getUserFeed:(req,res)=>{
        res.render('feed')
    
    },
    getRegitser:(req,res)=>{
        res.render('register')  
    },
    
}