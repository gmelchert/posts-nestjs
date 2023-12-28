import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

import { AuthPayloadValidatorMiddleware } from "src/middlewares";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthPayloadValidatorMiddleware).forRoutes(
            {
                method: RequestMethod.POST,
                path: 'auth/sign-in',
            }
        );
    }
}