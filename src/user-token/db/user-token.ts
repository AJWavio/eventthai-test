import { prop, getModelForClass } from '@typegoose/typegoose';

export class UserToken {
    @prop({
        required: true,
        index: {
            collation: {
                strength: 5,
                locale: 'simple',
            },
            unique: true,
        },
        unique: true,
    })
    username: string;

    @prop({ require: true })
    token: string;
}

export const UserTokenModel = getModelForClass(UserToken);
