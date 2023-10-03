import { Inject, Injectable } from '@nestjs/common';
import { CountryViewModel } from './dto/country.view-model';
import {
    COUNTRY_REPO_PROVIDER_TOKEN,
    CountryRepository,
} from './database/country.repository';
import { CountryQuery } from './database/country.query';
import { Country } from './database/country';

@Injectable()
export class CountryService {
    constructor(
        @Inject(COUNTRY_REPO_PROVIDER_TOKEN)
        private readonly countryRepository: CountryRepository,
    ) {}

    async getAllCountry(): Promise<CountryViewModel[]> {
        const countryViewModelList: CountryViewModel[] = [];
        const countryDocList = await this.countryRepository.findAll();

        for (const countryDoc of countryDocList) {
            const { code, name } = countryDoc;

            countryViewModelList.push({
                countryCode: code,
                countryName: name,
            });
        }

        return countryViewModelList;
    }

    async getCountryQuery(
        countryQuery: CountryQuery,
    ): Promise<CountryViewModel | null> {
        const { countryCode, countryName } = countryQuery;

        const countryDoc: Country | null = await this.countryRepository.findOne(
            {
                $or: [
                    {
                        code: countryCode,
                    },
                    {
                        name: countryName,
                    },
                ],
            },
        );

        if (!countryDoc) return null;

        const { code, name } = countryDoc;

        const countryViewModel: CountryViewModel = {
            countryCode: code,
            countryName: name,
        };

        return countryViewModel;
    }
}
