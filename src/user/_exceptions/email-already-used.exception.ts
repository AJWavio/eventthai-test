import { BadRequestException } from '@nestjs/common';

export class UserEmailAlreadyUsedException extends BadRequestException {
    constructor(email: string) {
        super(undefined, `Email "${email}" is already used`);
    }
}
