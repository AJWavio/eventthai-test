import { ApiProperty } from '@nestjs/swagger';

export abstract class ResponseBase {
    @ApiProperty({
        description: 'Response id',
        example: '1a6f0dc9-b736-4618-aea5-f43f976c850b',
    })
    readonly id: string;

    @ApiProperty({
        description: 'Response create date in ISO String format',
        example: '2023-10-02T15:49:23.221Z',
    })
    readonly createdAt: string;
}
