import { ApiProperty } from '@nestjs/swagger';

export class CountryGetReqDto {
    @ApiProperty({
        description: 'Country name used for search',
        example: 'Thailand',
        required: false,
    })
    readonly countryName: string;

    @ApiProperty({
        description: 'Country code used for search',
        example: 'TH',
        required: false,
    })
    readonly countryCode: string;
}
