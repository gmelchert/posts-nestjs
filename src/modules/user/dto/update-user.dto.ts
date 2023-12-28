import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types";


export class PutUserDto extends CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsStrongPassword({
        minLength: 6,
    })
    password: string;
};

export class PatchUserDto extends PartialType(CreateUserDto) {};