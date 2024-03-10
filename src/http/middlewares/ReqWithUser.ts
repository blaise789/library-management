import { User } from "../../database/entities/User";

export interface RequestWithUser extends Request{
    user?:User
}