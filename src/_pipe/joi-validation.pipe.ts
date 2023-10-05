import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AnySchema, attempt } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private readonly joiSchema: AnySchema) {}

    transform(value: any) {
        try {
            attempt(value, this.joiSchema);
        } catch (error) {
            throw new BadRequestException('Request validation failed');
        }

        return value;
    }
}
