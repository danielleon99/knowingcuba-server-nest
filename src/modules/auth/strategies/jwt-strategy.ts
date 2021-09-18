import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_KEY } from 'src/modules/app/app.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('x-token'),
            ignoreExpiration: false,
            secretOrKey: JWT_KEY
        });
    }

    async validate(payload: any) {
        return { ...payload }
    }
}