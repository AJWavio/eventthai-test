import { sign, verify } from 'jsonwebtoken';
import { USER_JWT_EXPIRE, USER_JWT_SECRET } from 'src/_config/auth.config';

export function generateJwt<PayloadT extends object>(
    payload: PayloadT,
): string {
    const token = sign(payload, USER_JWT_SECRET, {
        expiresIn: USER_JWT_EXPIRE,
    });

    return token;
}

export function verifyJwt<PayloadT>(token: string): PayloadT {
    const payload = verify(token, USER_JWT_SECRET);

    return payload as PayloadT;
}
