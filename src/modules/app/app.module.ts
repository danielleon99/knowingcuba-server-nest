import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '../database/database.module';
import config from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    DatabaseModule
  ],

})
export class AppModule { }
