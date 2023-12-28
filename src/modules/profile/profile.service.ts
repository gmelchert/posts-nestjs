import { Injectable, NotAcceptableException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateProfileDto, UpdateProfileDto } from "./dto";

@Injectable()
export class ProfileService {
    constructor(private readonly db: DatabaseService) {}
    
    async find(userId: number) {
        return this.db.profile.findUnique({
            where: {
                userId,
            },
            select: {
                id: true,
                bio: true,
                title: true,
            }
        })
    }

    async create(payload: CreateProfileDto, userId: number) {
        try {
            return this.db.profile.create({
                data: {
                    ...payload,
                    userId
                },
                select: {
                    bio: true,
                    title: true,
                    id: true,
                    userId: true,
                }
            })
        } catch(err) {
            throw new NotAcceptableException({
                success: false,
                error: err.meta.cause,
                message: 'Error on creating profile.',
            });
        }
    }

    async update(
        payload: UpdateProfileDto,
        userId: number
    ) {
        try {
            return this.db.profile.update({
                where: { userId },
                data: {
                    ...payload,
                },
                select: {
                    bio: true,
                    title: true,
                    id: true,
                    userId: true,
                }
            })
        } catch(err) {
            throw new NotAcceptableException({
                success: false,
                error: err.meta.cause,
                message: 'Error on creating profile.',
            });
        }
    }
}