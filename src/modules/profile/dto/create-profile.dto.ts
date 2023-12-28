import { IsString } from "class-validator";

export class CreateProfileDto {
    @IsString()
    bio: string;

    @IsString()
    title: string;
}