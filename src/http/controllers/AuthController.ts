import { AppDataSource } from "../../database/data-source";
import { LoginDTO, RegisterDto } from "../dtos/Auth";
import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import hashPassword from "../../utils/passwordHash";
import { User } from "../../database/entities/User";
import { ResponseUtil } from "../../utils/Response";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthController {

    async register(req: Request, res: Response) {
        const registerData = req.body;
        console.log(registerData)
        
        const dto = new RegisterDto();
        dto.email = registerData.email;
        dto.name = registerData.name;
        dto.password = await hashPassword(registerData.password);
        await validateOrReject(dto);
        const repo = AppDataSource.getRepository(User);

        const user = repo.create(dto)
        await repo.save(user)
        return ResponseUtil.sendResponse(res, "user created successfully",user,null,201)

    }

    async login(req: Request, res: Response) {
        const {email,password}=req.body;
        const dto=new LoginDTO()
        dto.password=password
        dto.email=email
        await validateOrReject(dto)
        const repo=AppDataSource.getRepository(User);
        const user=await repo.findOneBy({email:email})
        if(!user){
            return ResponseUtil.sendError(res,"invalid credentials",401,null)
        }  
        let passwordMatches=await compare(password,user.password)

         if(!passwordMatches){
            return ResponseUtil.sendResponse(res,"invalid credentials",401,null)
         }
         let accessToken=sign({userId:user.id},process.env.ACCESS_KEY_SECRET ||"secretkey",{expiresIn:"30m"})
         const userReturn=user.toResponse()
         return ResponseUtil.sendResponse(res,"login successfully",{user:userReturn,accessToken})
        
        // logic to login
    }
}
