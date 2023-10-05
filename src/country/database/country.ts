import { prop, getModelForClass } from '@typegoose/typegoose';

export class Country {
    @prop({
        required: true,
        index: {
            collation: {
                strength: 1,
                locale: 'simple',
            },
            unique: true,
        },
        unique: true,
    })
    name: string;

    @prop({
        required: true,
        index: {
            collation: {
                strength: 1,
                locale: 'simple',
            },
            unique: true,
        },
        unique: true,
    })
    code: string;
}

export const CountryModel = getModelForClass(Country);
