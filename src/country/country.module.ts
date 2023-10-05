import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { CountryRepositoryProvider } from './database/country.repository';

@Module({
    controllers: [CountryController],
    providers: [CountryService, CountryRepositoryProvider],
    exports: [CountryRepositoryProvider],
})
export class CountryModule {}
