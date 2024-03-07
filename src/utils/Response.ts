import { Response } from "express"
export class ResponseUtil{
    static sendError<T>(res:Response,message:string,statusCode=500,error:T){
        return res.status(statusCode).json({
            success:false,
            message,error})

    }
static sendResponse<T>(
res:Response,
message:string,
data:T,
paginationInfo:any=null,
statusCode=200
):Response<T>{
 return   res.status(statusCode).json({
        success:true,
        message,
        data,
        paginationInfo
    })
}
}