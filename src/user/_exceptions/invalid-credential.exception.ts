import { UnauthorizedException } from '@nestjs/common';

export class UserInvalidCredentialException extends UnauthorizedException {
    constructor() {
        super('Provided credential is invalid');
    }
}
