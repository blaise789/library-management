import express,{Express ,NextFunction,Request,Response} from "express"
import cors from "cors"
import bodyParser from "body-parser";

import authRoute from "./routes/auth"
import authorRoute from "./routes/authors"
import { ErrorHandler } from "./http/middlewares/ErrorHandler";

const app: Express = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use("/authors",authorRoute)
app.use("/auth",authRoute)
app.use("*",(request:Request,response:Response)=>{
    return response.status(404).json({
    success:"false",
    message:"invalid route"

    })
    
})
app.use(ErrorHandler.handleErrors)

export default app;