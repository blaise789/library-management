import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator"

export class RegisterDto {

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    name: string;
    @IsNotEmpty()
    @IsEmail()
    // @IsUnique(User, "email")
    email: string;
  
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(200)
    password:string

}
export class LoginDTO {


    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(200)
    password: string
}