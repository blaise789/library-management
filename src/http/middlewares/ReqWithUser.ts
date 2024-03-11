import { User } from "../../database/entities/User";
import { Request } from "express";

export interface RequestWithUser extends Request{
    user?:User
}