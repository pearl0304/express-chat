import express from "express"
import helmet from "helmet"
import MongoClient from "./modles/config.js"
import router from "./routers/main_router.js"
import csp from "helmet-csp"

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
        this.app.use(helmet())
        this.app.use(
            csp({
              directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'","'unsafe-inline'"],
                scriptSrc: ["'self'"],
              },
            })
          );
    
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