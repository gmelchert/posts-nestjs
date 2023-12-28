import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    NotFoundException,
} from '@nestjs/common';

import { PostService } from './post.service';
import { CreatePostDto, FindPostDto } from './dto';

import {
    PageQuery,
    PageQueryDto,
    Public,
    UserLogged,
    UserLoggedDto,
} from 'src/decorators';

import { Ok } from 'src/shared';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    async create(
        @Body() createPostDto: CreatePostDto,
        @UserLogged() user: UserLoggedDto,
    ) {
        const post = await this.postService.create(createPostDto, user.id);
        const message = 'Post created with success.';

        return new Ok({ message, data: post });
    }

    @Public()
    @Get()
    async findAll(
        @PageQuery() { query, page }: PageQueryDto<FindPostDto>,
    ) {
        const [total, posts] = await this.postService.findAll(query, page);
        const totalPages = Math.ceil(total / page.take);
        const message = `${posts.length} posts found.`;

        return new Ok({ message, data: { posts, total, totalPages } });
    }
    
    @Get('user')
    async findByUser(
        @PageQuery() { query, page }: PageQueryDto<FindPostDto>,
        @UserLogged() { id }: UserLoggedDto
    ) {
        const [total, posts] = await this.postService.findByUser(id, query, page);
        const totalPages = Math.ceil(total / page.take);
        const message = `${posts.length} posts found.`;

        return new Ok({ message, data: { posts, total, totalPages } });
    }

    @Get('find/:id')
    async findOne(
        @Param('id') id: string,
        @UserLogged() { id: userId }: UserLoggedDto
    ) {
        const post = await this.postService.findOne(+id, userId);
        if (!post) throw new NotFoundException({
            success: true,
            error: 'Not found.',
            message: 'Post not found.',
        })

        const message = 'Post found with success.';
        return new Ok({ message, data: post });
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
        @UserLogged() { id: userId }: UserLoggedDto,
    ) {
        await this.postService.remove(+id, userId);

        return new Ok({
            message: 'Post deleted with success.',
        })
    }
}
