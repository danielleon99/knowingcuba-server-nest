import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '../database/database.module';
import config from './app.config';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    DatabaseModule,
    RoleModule,
    UserModule
  ],

})
export class AppModule { }
