import { ApiProperty } from '@nestjs/swagger';
import { CountryViewModel } from '../country.view-model';
import { ResponseBase } from 'src/_dto/response.dto.base';

export class CountryGetOneResDto extends ResponseBase {
    @ApiProperty({
        description: 'Country\'s data',
        type: CountryViewModel,
        example: {
            countryName: 'Thailand',
            countryCode: 'TH',
        } as CountryViewModel,
    })
    readonly countryData: CountryViewModel;
}
