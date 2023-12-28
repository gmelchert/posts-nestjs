import {
    Controller,
    Get,
    Post,
    NotFoundException,
    Body,
    Put,
} from "@nestjs/common";

import { ProfileService } from "./profile.service";
import { UserLogged, UserLoggedDto } from "src/decorators";
import { Ok } from "src/shared";
import { CreateProfileDto, UpdateProfileDto } from "./dto";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}    

    @Get()
    async find(@UserLogged() user: UserLoggedDto) {
        const profile = await this.profileService.find(user.id);
        if (!profile) throw new NotFoundException({
            success: false,
            message: 'Profile not found.',
            error: 'Not found.',
        })

        const message = 'Profile found with success.';

        return new Ok({ message, data: profile })
    }

    @Post()
    async create(
        @UserLogged() user: UserLoggedDto,
        @Body() body: CreateProfileDto
    ) {
        const profile = await this.profileService.create(body, user.id);
        const message = 'Profile created with success.';

        return new Ok({ message, data: profile });
    }

    @Put(':id')
    async update(
        @UserLogged() user: UserLoggedDto,
        @Body() body: UpdateProfileDto,
    ) {
        const profile = await this.profileService.update(body, user.id);
        const message = 'Profile updated with success.';

        return new Ok({ message, data: profile });
    }
}