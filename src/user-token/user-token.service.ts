import { Inject, Injectable } from '@nestjs/common';
import {
    USER_TOKEN_REPO_PROVIDER_TOKEN,
    UserTokenRepository,
} from './db/user-token.repository';

@Injectable()
export class UserTokenService {
    constructor(
        @Inject(USER_TOKEN_REPO_PROVIDER_TOKEN)
        private readonly userTokenRepository: UserTokenRepository,
    ) {}

    async createUserTokenDb(username: string, token: string): Promise<void> {
        await this.userTokenRepository.createOne({
            token,
            username,
        });
    }

    async validateUserToken(username: string, token: string): Promise<boolean> {
        const userTokenDoc = await this.userTokenRepository.findOne({
            username,
        });

        if (!userTokenDoc) return false;
        if (userTokenDoc.token !== token) return false;

        return true;
    }
}
