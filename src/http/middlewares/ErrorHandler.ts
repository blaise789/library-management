import { NextFunction, Request, Response } from "express-serve-static-core";
import { Entity, EntityNotFoundError } from "typeorm";
import { ResponseUtil } from "../../utils/Response";

export class ErrorHandler {
    static catch(fn) {
        return (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req,res,next)).catch(next)

        }


    }
    static handleErrors(err:any,req:Request,res:Response,next:NextFunction){
        console.log(err)
        if(err instanceof EntityNotFoundError){
            return ResponseUtil.sendError(res,"item not found ",404,null)
        }
    }
}