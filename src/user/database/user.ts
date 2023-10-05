import { Ref, getModelForClass, plugin, prop } from '@typegoose/typegoose';
import { Country } from 'src/country/database/country';
import * as mongooseAutoPopulate from 'mongoose-autopopulate';

@plugin(mongooseAutoPopulate as any)
export class User {
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

    @prop({
        required: true,
        unique: true,
    })
    email: string;

    @prop({
        required: true,
    })
    password_hash: string;

    @prop({
        autopopulate: true,
        ref: Country,
        required: true,
    })
    country: Ref<Country> | Country;
}

export const UserModel = getModelForClass(User);
