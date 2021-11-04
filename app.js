import express from "express"
import MongoClient from "./mongodb/config.js"
import router from "./routers/main_router.js"

class App {
    constructor(){
        this.app=express()
        this.db=MongoClient.connect()

        this.getDbConfig()
        this.setViewEngine()
        this.getRouters()
    }

    getDbConfig(){this.db}

    setViewEngine(){
        this.app.set('views','src/views')
        this.app.set('view engine', 'ejs')
    }
    getRouters(){
        this.app.use(router)
    }

}

export default App