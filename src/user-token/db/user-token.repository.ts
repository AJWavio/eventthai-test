import { MongoRepositoryBase } from 'src/_db/mongo.repository';
import { UserToken, UserTokenModel } from './user-token';
import { ClientSession } from 'mongoose';
import { FactoryProvider } from '@nestjs/common';

export class UserTokenRepository extends MongoRepositoryBase<typeof UserToken> {
    async findByUsername(
        username: string,
        toObject = true,
    ): Promise<UserToken | null> {
        const userDoc = await this.model.findOne({
            username,
        });

        if (!userDoc) return null;
        if (toObject) return userDoc.toObject();

        return userDoc;
    }
}

export const USER_TOKEN_REPO_PROVIDER_TOKEN = 'USER_TOKEN_REPO_PROVIDER';
export const UserTokenRepositoryProvider: FactoryProvider<UserTokenRepository> =
    {
        provide: USER_TOKEN_REPO_PROVIDER_TOKEN,
        useFactory: () => {
            return new UserTokenRepository(UserTokenModel);
        },
    };
