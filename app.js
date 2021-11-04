import express from "express"
import MongoClient from "./modles/config.js"
import router from "./routers/main_router.js"

class App {
    constructor(){
        this.app=express()
        this.db=MongoClient.connect()

        this.getDbConfig()
        this.setViewEngine()
        this.setMiddleware()
        this.setStatic()
        this.getRouters()
    }

    getDbConfig(){this.db}

    setViewEngine(){
        this.app.set('views','src/views')
        this.app.set('view engine', 'ejs')
    }
    setMiddleware(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}))
    }

    setStatic(){
        this.app.use('/public',express.static('src/public'))
        this.app.use('/uploads',express.static('/uploads'))
    }

    getRouters(){
        this.app.use(router)
    }

}

export default App