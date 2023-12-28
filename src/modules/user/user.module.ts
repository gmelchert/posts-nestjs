import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod
} from "@nestjs/common";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

import { UserIdMiddleware } from "src/middlewares";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // consumer.apply(UserIdMiddleware).forRoutes({
        //     path: 'users/:id',
        //     method: RequestMethod.ALL,
        // });
    }
}