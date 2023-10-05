import { JwtPayload } from 'jsonwebtoken';

export type UserJwtPayload = {
    readonly username: string;
    readonly email: string;
};

export type UserJwtPayloadVerified = JwtPayload & UserJwtPayload;
