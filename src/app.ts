import express,{Express ,NextFunction,Request,Response} from "express"
import cors from "cors"
import bodyParser from "body-parser";
import { EntityNotFoundError } from "typeorm";
import { ResponseUtil } from "./utils/Response";

const app: Express = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use("*",(request:Request,response:Response)=>{
    return response.status(200).json({
    success:"false",
    message:"invalid route"

    })
app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
    if(err instanceof EntityNotFoundError){
        return ResponseUtil.sendError(res,)
    
    }
})    
})

export default app;