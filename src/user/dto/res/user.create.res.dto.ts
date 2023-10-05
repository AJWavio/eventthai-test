import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from 'src/_dto/response.dto.base';
import { UserDto } from '../user.dto';

export class UserCreateResDto extends ResponseBase {
    @ApiProperty({
        description: 'Data of the user created',
        type: UserDto,
    })
    readonly userData: UserDto;
}
