import { ApiProperty } from '@nestjs/swagger';
import { CountryViewModel } from '../country.view-model';
import { ResponseBase } from 'src/_dto/response.dto.base';

export class CountryGetListResDto extends ResponseBase {
    @ApiProperty({
        description: 'List of country\'s data',
        type: Array<CountryViewModel>,
        example: [
            {
                countryName: 'Thailand',
                countryCode: 'TH',
            },
            {
                countryName: 'England',
                countryCode: 'EN',
            },
        ] as Array<CountryViewModel>,
    })
    readonly countryDataList: Array<CountryViewModel>;
}
