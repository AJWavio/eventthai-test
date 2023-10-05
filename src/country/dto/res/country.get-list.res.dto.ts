import { ApiProperty } from '@nestjs/swagger';
import { CountryDto } from '../country.dto';
import { ResponseBase } from 'src/_dto/response.dto.base';

export class CountryGetListResDto extends ResponseBase {
    @ApiProperty({
        description: 'List of country\'s data',
        type: Array<CountryDto>,
        example: [
            {
                countryName: 'Thailand',
                countryCode: 'TH',
            },
            {
                countryName: 'England',
                countryCode: 'EN',
            },
        ] as Array<CountryDto>,
    })
    readonly countryDataList: Array<CountryDto>;
}
