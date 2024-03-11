import { NextFunction } from "express";
import { RequestWithUser } from "./ReqWithUser";
import { Roles } from "../../constants/Role";
import { ResponseUtil } from "../../utils/Response";
import { Response } from "express";

export class AdminMiddleware{
    static isAdmin(req:RequestWithUser,res:Response,next:NextFunction){
      const user=req.user 
      if(user.role !=Roles.ADMIN){
        return ResponseUtil.sendError(res,"Unauthorized to access this endpoint ",403,null)
      }
    next()
    }

}