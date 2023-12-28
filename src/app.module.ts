import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard } from './guard';

import { DatabaseModule } from './database/database.module';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { PostModule } from './modules/post/post.module';

@Module({
    imports: [
        DatabaseModule,
        UserModule,
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        ProfileModule,
        PostModule,
    ],
    controllers: [],
    providers: [{
        provide: APP_GUARD,
        useClass: AuthGuard,
    }],
})
export class AppModule {}
