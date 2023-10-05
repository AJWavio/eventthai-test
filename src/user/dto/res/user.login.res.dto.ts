import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from 'src/_dto/response.dto.base';
import { UserLoginDto } from '../user.dto';

export class UserLoginResDto extends ResponseBase {
    @ApiProperty({
        description: 'Login data with JWT token',
        type: UserLoginDto,
    })
    readonly loginData: UserLoginDto;
}
