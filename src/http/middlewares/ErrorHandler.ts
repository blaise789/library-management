import { NextFunction, Request, Response } from "express-serve-static-core";
import { Entity, EntityNotFoundError } from "typeorm";
import { ResponseUtil } from "../../utils/Response";
import { ValidationError } from "class-validator";
import { error } from "console";

export class ErrorHandler {
    static catch(fn) {
        return (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req,res,next)).catch(next)
            // calling the next function if any error is thrown

        }


    }
    static handleErrors(err:any,req:Request,res:Response,next:NextFunction){
        console.log(err)
        if(err instanceof EntityNotFoundError){
            return ResponseUtil.sendError(res,"item not found ",404,null)
        }
        if(err.message==="Invalid file type"){
            return ResponseUtil.sendError(res,"invalid file type",422,null)

        }
        if(err.length>0 && err[0] instanceof ValidationError){
            const errors=ErrorHandler.formatErrors(err);
            return ResponseUtil.sendError(res,"invalid input",422,errors)
        }
        return res.status(500).send({success:false,message:"something went wrong"})
            }
   static formatErrors(err:any){
    const errors={}
    err.forEach((e) => {
        if(!errors[e.property]){
            errors[e.property] =[]
        }
        errors[e.property].push(e.constraints[Object.keys(e.constraints)[0]]);
        
      
        
    })
    ;
    return errors;
   }         


}