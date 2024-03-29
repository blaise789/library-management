import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class CreateAuthorDto{
    id?:number
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(300)
    name:string
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsOptional()
    @IsString()
    @MaxLength(200)
    bio:string


}