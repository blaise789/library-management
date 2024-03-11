import { Any } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { User } from "../../database/entities/User";
import { ResponseUtil } from "../../utils/Response";
import { NextFunction,Response,Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { RequestWithUser } from "./ReqWithUser";

export class AuthMiddleware{
     static async authenticate(req:RequestWithUser,res:Response,next:NextFunction){
        const {authorization:tokenHeader}=req.headers
    
        if(!tokenHeader){
            return ResponseUtil.sendError(res,"no token provided",401,null)
        }
        const token=tokenHeader.split(" ")[2]
        console.log(token)
        try{
            const decoded=   jwt.verify(token,process.env.ACCESS_KEY_SECRET || "secretkey") as JwtPayload
            const {userId:id}=decoded
        

        
            const repo=AppDataSource.getRepository(User)

            const user =await repo.findOneByOrFail({id:id})
            // req.user=user 
            req.user=user

            
        }
        catch(err){
            console.log(err)
            return ResponseUtil.sendError(res, "Invalid token", 401, null);
        }
        next()

    }
}