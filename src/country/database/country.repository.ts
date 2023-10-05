import { MongoRepositoryBase } from 'src/_db/mongo.repository';
import { Country, CountryModel } from './country';
import { ClientSession } from 'mongoose';
import { FactoryProvider } from '@nestjs/common';

export class CountryRepository extends MongoRepositoryBase<typeof Country> {
    async findOneByName(
        countryName: string,
        toObject = false,
    ): Promise<Country | null> {
        const countryDoc = await this.model.findOne({
            name: countryName,
        });

        if (!countryDoc) return null;
        if (toObject) return countryDoc.toObject();

        return countryDoc;
    }

    async findOneByCode(
        countryCode: string,
        toObject = false,
    ): Promise<Country | null> {
        const countryDoc = await this.model.findOne({
            code: countryCode,
        });

        if (!countryDoc) return null;
        if (toObject) return countryDoc.toObject();

        return countryDoc;
    }
}

export const COUNTRY_REPO_PROVIDER_TOKEN = 'COUNTRY_REPO_PROVIDER';
export const CountryRepositoryProvider: FactoryProvider<CountryRepository> = {
    provide: COUNTRY_REPO_PROVIDER_TOKEN,
    useFactory: () => {
        return new CountryRepository(CountryModel);
    },
};
