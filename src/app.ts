import express, { Express } from "express"
import cors from "cors"

const app: Express = express();
app.use(cors())
app.get("/hello",(req,res,next)=>{
    return res.status(200).json({message:"hello world"})
})
export default app;