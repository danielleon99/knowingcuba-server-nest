import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './app.config';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    AuthModule,
    DatabaseModule,
    RoleModule,
    UserModule
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard
    // }
  ]

})
export class AppModule { }
