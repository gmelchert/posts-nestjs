import { BadRequestException, Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';

import { CreatePostDto, FindPostDto } from './dto';
import { PageDto } from 'src/shared';

@Injectable()
export class PostService {
    constructor(private readonly db: DatabaseService) {}

    create(createPostDto: CreatePostDto, userId: number) {
        try {
            return this.db.post.create({
                data: {
                    ...createPostDto,
                    userId,
                }
            })            
        } catch (err) {
            throw new BadRequestException({
                success: false,
                error: err.meta.cause,
                message: 'Failed on creating post.'
            })
        }
    }

    async findAll(query: FindPostDto, page: PageDto) {
        return this.db.$transaction([
            this.db.post.count(),
            this.db.post.findMany({
                where: {
                    ...query,
                },
                ...page,
                select: {
                    user: true,
                    content: true,
                    createdAt: true,
                    title: true,
                    id: true,
                    updatedAt: true,
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        ])
    }

    async findByUser(userId: number, query: FindPostDto, page: PageDto) {
        return this.db.$transaction([
            this.db.post.count({
                where: {
                    userId,
                },
            }),
            this.db.post.findMany({
                where: {
                    userId,
                    ...query,
                },
                ...page,
                select: {
                    user: true,
                    content: true,
                    createdAt: true,
                    title: true,
                    id: true,
                    updatedAt: true,
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        ])
    }

    findOne(id: number, userId: number) {
        return this.db.post.findFirst({
            where: { id, userId }
        })
    }

    async remove(id: number, userId: number) {
        try {
            return await this.db.$queryRaw`DELETE FROM posts WHERE id = ${id} AND user_id = ${userId}`;            
        } catch (err) {
            console.log(err)
            throw new BadRequestException({
                success: false,
                error: err.meta.cause,
                message: 'Failed on deleting post.'
            });
        }
    }
}
