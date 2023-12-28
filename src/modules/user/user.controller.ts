import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Patch,
    Post,
    Put,
    UseInterceptors,
} from "@nestjs/common";

import { UserService } from "./user.service";

import { LogInterceptor, UserInterceptor } from "src/interceptors";
import {
    PageQuery,
    ParamId,
    Public,
    PageQueryDto,
    UserLogged,
    UserLoggedDto,
} from "src/decorators";

import {
    CreateUserDto,
    PatchUserDto,
    PutUserDto,
    UserQueryDto,
} from "./dto";
import { Ok } from "src/shared";

@UseInterceptors(UserInterceptor)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @UseInterceptors(LogInterceptor)
    @Get()
    async findAll(
        @PageQuery() { query, page }: PageQueryDto<UserQueryDto>
    ) {
        const users = await this.userService.findAll(query, page);
        const message = `${users.length} users found.`;

        return new Ok({ message, data: users });
    }

    // @Get(':id')
    // async findUnique(@ParamId() id: number) {
    //     const user = await this.userService.findUnique(id);
    //     if (!user) throw new NotFoundException({
    //         success: false,
    //         message: 'User not found.'
    //     });

    //     const message = `User ${user.name} found.`;

    //     return new Ok({ data: [user], message });
    // }

    @Get('all')
    async findPosts(
        @UserLogged() { id }: UserLoggedDto
    ) {
        const user = await this.userService.findPosts(id);
        const message = ``;

        return new Ok({ message, data: user });
    }

    @Post()
    async create(@Body() body: CreateUserDto) {
        const { email } = body;
        !email && (body.email = '');

        const user = await this.userService.create(body);
        const message = 'User created with success.';

        return new Ok({ message, data: [user] });
    }

    @Put(':id')
    async update(@Body() body: PutUserDto, @ParamId() id: number) {
        !body.email && (body.email = '');
        
        const user = await this.userService.update(body, id);
        const message = 'User updated.';

        return new Ok({ message, data: [user] });
    }

    @Patch(':id')
    async patch(@Body() body: PatchUserDto, @ParamId() id: number) {
        const user = await this.userService.patch(body, id);
        const message = 'User updated.';
        
        return new Ok({ message, data: [user] });
    }

    @Delete()
    async delete(
        @UserLogged() { id }: UserLoggedDto
    ) {
        await this.userService.delete(id);
        const message = 'User deleted.';
    
        return new Ok({ message });
    }
}

