import { ApiProperty } from '@nestjs/swagger';

export class UserCreateReqDto {
    @ApiProperty({
        description: 'Username of the user',
    })
    readonly username: string;

    @ApiProperty({
        description: 'Email of the user',
    })
    readonly email: string;

    @ApiProperty({
        description: 'Password',
    })
    readonly password: string;

    @ApiProperty({
        description: 'User country code',
    })
    readonly countryCode: string;
}
