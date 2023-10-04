import { Inject, Injectable } from '@nestjs/common';
import { CountryViewModel } from './dto/country.view-model';
import {
    COUNTRY_REPO_PROVIDER_TOKEN,
    CountryRepository,
} from './database/country.repository';
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

    async getCountryByCode(
        countryCode: string,
    ): Promise<CountryViewModel | null> {
        const countryDoc: Country | null =
            await this.countryRepository.findOneByCode(countryCode);

        if (!countryDoc) return null;

        const countryViewModel: CountryViewModel = {
            countryCode: countryDoc.code,
            countryName: countryDoc.name,
        };

        return countryViewModel;
    }

    async getCountryByName(
        countryName: string,
    ): Promise<CountryViewModel | null> {
        const countryDoc: Country | null =
            await this.countryRepository.findOneByName(countryName);

        if (!countryDoc) return null;

        const countryViewModel: CountryViewModel = {
            countryCode: countryDoc.code,
            countryName: countryDoc.name,
        };

        return countryViewModel;
    }
}
