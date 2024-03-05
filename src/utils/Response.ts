import { Response } from "express"
export class ResponseUtil{
    static sendError<T>(res:Response,message:string,statusCode=500,error:T){
        return res.status(statusCode).json({
            success:false,
            message,error})

    }
}