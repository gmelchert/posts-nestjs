import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class SignOnDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minSymbols: 1
    })
    password: string;
}