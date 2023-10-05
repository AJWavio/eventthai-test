import { Inject, Injectable } from '@nestjs/common';
import { CountryDto } from './dto/country.dto';
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

    async getAllCountry(): Promise<CountryDto[]> {
        const countryDtoList: CountryDto[] = [];
        const countryDocList = await this.countryRepository.findAll();

        for (const countryDoc of countryDocList) {
            const { code, name } = countryDoc;

            countryDtoList.push({
                countryCode: code,
                countryName: name,
            });
        }

        return countryDtoList;
    }

    async getCountryByCode(countryCode: string): Promise<CountryDto | null> {
        const countryDoc: Country | null =
            await this.countryRepository.findOneByCode(countryCode);

        if (!countryDoc) return null;

        const countryDto: CountryDto = {
            countryCode: countryDoc.code,
            countryName: countryDoc.name,
        };

        return countryDto;
    }

    async getCountryByName(countryName: string): Promise<CountryDto | null> {
        const countryDoc: Country | null =
            await this.countryRepository.findOneByName(countryName);

        if (!countryDoc) return null;

        const countryDto: CountryDto = {
            countryCode: countryDoc.code,
            countryName: countryDoc.name,
        };

        return countryDto;
    }
}
