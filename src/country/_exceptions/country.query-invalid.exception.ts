import { BadRequestException } from '@nestjs/common';

export class CountryQueryInvalidException extends BadRequestException {
    constructor() {
        super(undefined, 'Provided query was invalid');
    }
}
