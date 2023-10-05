import {
    Injectable,
    ExecutionContext,
    UnauthorizedException,
    InternalServerErrorException,
    BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { verifyJwt } from 'src/_util/jwt.util';
import { UserTokenService } from 'src/user-token/user-token.service';
import { UserJwtPayloadVerified } from './user.jwt-payload';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly userTokenService: UserTokenService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const req: Request = context.switchToHttp().getRequest();

            const authHeader =
                req.headers['Authorization'] ?? req.headers['authorization'];

            if (!authHeader) throw new UnauthorizedException();

            const authHeaderSplitted = authHeader.split(' ');
            const token = authHeaderSplitted[1];
            if (!token) throw new BadRequestException();

            let jwtPayloadVerified: UserJwtPayloadVerified;

            try {
                jwtPayloadVerified = verifyJwt(token);
            } catch (error) {
                throw new UnauthorizedException(error);
            }

            try {
                const username = jwtPayloadVerified.username;
                const validateResult =
                    await this.userTokenService.validateUserToken(
                        username,
                        token,
                    );
                if (!validateResult) throw new UnauthorizedException();
            } catch (error) {
                if (error instanceof UnauthorizedException) throw error;

                throw new InternalServerErrorException(error);
            }

            return super.canActivate(context) as boolean;
        } catch (error) {
            console.error(error);
        }
    }

    handleRequest(error: any, user: any) {
        if (error || !user) {
            throw error || new UnauthorizedException();
        }

        return user;
    }
}
