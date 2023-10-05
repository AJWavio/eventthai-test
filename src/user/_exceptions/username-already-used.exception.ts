import { BadRequestException } from '@nestjs/common';

export class UserUsernameAlreadyUsedException extends BadRequestException {
    constructor(username: string) {
        super(undefined, `Username "${username}" is already used`);
    }
}
