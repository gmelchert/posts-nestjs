import { IsString } from "class-validator";

export class UpdateProfileDto {
    @IsString()
    bio: string;

    @IsString()
    title: string;
}