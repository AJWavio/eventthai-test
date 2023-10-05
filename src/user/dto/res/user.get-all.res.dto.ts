import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from 'src/_dto/response.dto.base';
import { UserDto } from '../user.dto';

export class UserGetAllResDto extends ResponseBase {
    @ApiProperty({
        description: 'User data',
        type: Array<UserDto>,
        example: [
            {
                countryData: {
                    countryName: 'Thailand',
                    countryCode: 'TH',
                },
                email: 'test@example.com',
                username: 'testusername',
            },
            {
                countryData: {
                    countryName: 'England',
                    countryCode: 'EN',
                },
                email: 'test2@example.com',
                username: 'testusername2',
            },
        ] as Array<UserDto>,
    })
    readonly userDataList: UserDto[];
}
