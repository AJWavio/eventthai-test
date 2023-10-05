import { ApiProperty } from '@nestjs/swagger';
import { CountryDto } from 'src/country/dto/country.dto';

export class UserDto {
    @ApiProperty({
        description: 'Username of the user',
    })
    readonly username: string;

    @ApiProperty({
        description: 'Email of the user',
    })
    readonly email: string;

    @ApiProperty({
        description: 'User country info',
        type: CountryDto,
    })
    readonly countryData: CountryDto;
}

export class UserLoginDto {
    @ApiProperty({
        description: 'Jwt access token',
    })
    readonly token: string;
}
