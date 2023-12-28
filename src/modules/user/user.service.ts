import {
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from "@nestjs/common";

import { DatabaseService } from "src/database/database.service";

import {
    CreateUserDto,
    PatchUserDto,
    UserQueryDto,
    PutUserDto,
} from "./dto";

@Injectable()
export class UserService {
    constructor(private readonly db: DatabaseService) {}

    async findAll(query?: UserQueryDto, page?: { take: number; skip: number; }) {
        return this.db.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
            where: { ...query },
            ...page
        })
    }

    async findUnique(id: number) {        
        return this.db.user.findUnique({
            where: {
                id,
            },
            select: {
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true,
                id: true,
            }
        })
    }

    async findPosts(id: number) {
        return this.db.user.findUnique({
            where: { id },
            select: {
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true,
                posts: true,
                profile: true,
            }
        })
    }

    async create(data: CreateUserDto) {
        try {
            return this.db.user.create({
                data,
                select: {
                    email: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true,
                    id: true,
                }
            })
        } catch(err) {
            throw new NotAcceptableException({
                success: false,
                error: err.meta.cause,
                message: 'Error on creating user.',
            });
        }
    }

    async update(data: PutUserDto, id: number) {
        try {
            const user = await this.db.user.update({
                data,
                where: { id },
                select: {
                    email: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true,
                    id: true,
                },
            })
            
            return user;
        } catch(err) {
            throw new NotFoundException({
                success: false,
                error: err.meta.cause,
                message: 'Error on updating user.',
            });
        }
    }

    async patch(data: PatchUserDto, id: number) {
        try {
            const user = await this.db.user.update({
                data,
                where: { id },
                select: {
                    email: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true,
                    id: true,
                },
            })
            
            return user;
        } catch(err) {
            throw new NotFoundException({
                success: false,
                error: err.meta.cause,
                message: 'Error on updating user.',
            });
        }
    }

    async delete(id: number) {
        try {
            await this.db.user.delete({
                where: { id },
            });
        } catch(err) {
            throw new NotFoundException({
                success: false,
                error: err.meta.cause,
                message: 'Error on deleting user.',
            });
        }
    }
}