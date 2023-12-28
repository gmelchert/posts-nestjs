import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

import { DatabaseService } from "src/database/database.service";
import { UserService } from "../user/user.service";
import { SignOnDto } from "./dto";
import { User } from "@prisma/client";

type FindUserWhereDto = {
    name: string | undefined;
    email: string | undefined;
    password: string | undefined;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly db: DatabaseService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async findUser({ name, email, password }: FindUserWhereDto) {
        return this.db.user.findFirst({
            where: {
                name,
                password,
                email,
            },
        });
    }

    async signIn(user: User) {
        delete user.password;
        
        const payload = { sub: user.id, ...user };
        const accessToken = await this.jwtService.signAsync(payload);

        return accessToken;
    }

    async signOn(body: SignOnDto) {
        const { name, email, password } = body;
        const user = await this.userService.create({ name, email, password });

        const payload = { sub: user.id, ...user };
        const accessToken = await this.jwtService.signAsync(payload);

        return { accessToken, user };
    }
}