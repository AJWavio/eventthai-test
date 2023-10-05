import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from 'src/_dto/response.dto.base';
import { UserDto } from '../user.dto';

export class UserGetResDto extends ResponseBase {
    @ApiProperty({
        description: 'User data',
        type: UserDto,
        example: {
            countryData: {
                countryName: 'Thailand',
                countryCode: 'TH',
            },
            email: 'test@example.com',
            username: 'testusername',
        } as UserDto,
    })
    readonly userData: UserDto;
}
