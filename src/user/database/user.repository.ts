import { MongoRepositoryBase } from 'src/_db/mongo.repository';
import { User, UserModel } from './user';
import { ClientSession } from 'mongoose';
import { FactoryProvider } from '@nestjs/common';

export class UserRepository extends MongoRepositoryBase<typeof User> {
    async findByUsername(
        username: string,
        toObject = true,
    ): Promise<User | null> {
        const userDoc = await this.model.findOne({
            username,
        });

        if (!userDoc) return null;
        if (toObject) return userDoc.toObject();

        return userDoc;
    }

    async checkDuplicateUsername(username: string): Promise<boolean> {
        const userDoc = await this.model.findOne({
            username,
        });

        if (userDoc) return true;

        return false;
    }

    async checkDuplicateEmail(email: string): Promise<boolean> {
        const userDoc = await this.model.findOne({
            email,
        });

        if (userDoc) return true;

        return false;
    }
}

export const USER_REPO_PROVIDER_TOKEN = 'USER_REPO_PROVIDER';
export const UserRepositoryProvider: FactoryProvider<UserRepository> = {
    provide: USER_REPO_PROVIDER_TOKEN,
    useFactory: () => {
        return new UserRepository(UserModel);
    },
};
