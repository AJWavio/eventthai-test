import { ApiProperty } from '@nestjs/swagger';

export class CountryDto {
    @ApiProperty({
        description: 'Name of the country',
        example: 'Thailand',
    })
    readonly countryName: string;

    @ApiProperty({
        description: 'Code of the country',
        example: 'TH',
    })
    readonly countryCode: string;
}
