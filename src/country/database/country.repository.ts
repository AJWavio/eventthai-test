import { MongoRepositoryBase } from 'src/_db/mongo.repository';
import { Country, CountryModel } from './country';
import { ClientSession } from 'mongoose';

export class CountryRepository extends MongoRepositoryBase<typeof Country> {
    async findOneByName(
        countryName: string,
        session?: ClientSession,
    ): Promise<Country | null> {
        const countryDoc = await this.model.findOne(
            {
                name: countryName,
            },
            null,
            { session },
        );

        return countryDoc;
    }

    async findOneByCode(
        countryCode: string,
        session?: ClientSession,
    ): Promise<Country | null> {
        const countryDoc = await this.model.findOne(
            {
                code: countryCode,
            },
            null,
            {
                session,
            },
        );

        return countryDoc;
    }
}

export const COUNTRY_REPO_PROVIDER_TOKEN = 'COUNTRY_REPO_PROVIDER';
export const CountryRepositoryProvider = {
    provide: COUNTRY_REPO_PROVIDER_TOKEN,
    useFactory: () => {
        return new CountryRepository(CountryModel);
    },
};
