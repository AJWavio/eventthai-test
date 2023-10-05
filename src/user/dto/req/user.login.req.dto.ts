import { ApiProperty } from '@nestjs/swagger';

export class UserLoginReqDto {
    @ApiProperty({
        description: 'Username of the user',
    })
    readonly username: string;

    @ApiProperty({
        description: 'Password of the user',
    })
    readonly password: string;
}
