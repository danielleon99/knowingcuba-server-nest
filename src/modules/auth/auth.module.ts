import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtStrategy, LocalStrategy } from './strategies';
import { UserModule } from '../user/user.module';
import { JWT_KEY } from '../app/app.constants';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: JWT_KEY,
            signOptions: { expiresIn: '8h' }
        })
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy
    ]
})
export class AuthModule { }
