import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { USER_JWT_SECRET } from 'src/_config/auth.config';
import { UserJwtPayloadVerified } from './user.jwt-payload';
import { UserSessionData } from './user.session-data';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: USER_JWT_SECRET,
        });
    }

    async validate(payload: UserJwtPayloadVerified): Promise<UserSessionData> {
        return {
            email: payload.email,
            username: payload.username,
        };
    }
}
