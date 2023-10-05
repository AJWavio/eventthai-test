import { ApiProperty } from '@nestjs/swagger';
import { CountryDto } from '../country.dto';
import { ResponseBase } from 'src/_dto/response.dto.base';

export class CountryGetOneResDto extends ResponseBase {
    @ApiProperty({
        description: 'Country\'s data',
        type: CountryDto,
        example: {
            countryName: 'Thailand',
            countryCode: 'TH',
        } as CountryDto,
    })
    readonly countryData: CountryDto;
}
