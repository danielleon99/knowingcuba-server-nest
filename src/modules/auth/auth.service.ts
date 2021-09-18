import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';

import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string) {

        const user = await this.userService.getUserByEmail(email);

        if (user.password && (await compare(password, user?.password))) {
            return user;
        }

        return null;
    }

    async login(user: any) {

        const payload = {
            name: user.name,
            email: user.email,
            uid: user.id
        };

        return {
            ok: true,
            access_token: this.jwtService.sign(payload),
            user: payload
        };
    }
}
