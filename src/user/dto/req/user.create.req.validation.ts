import * as joi from 'joi';
import { UserCreateReqDto } from './user.create.req.dto';
import { rfc2822EmailRegex } from 'src/_util/regex.util';

export const userCreateValidationSchema = joi.object<UserCreateReqDto>({
    countryCode: joi.string().required().min(2).max(4),
    email: joi.string().required().regex(rfc2822EmailRegex),
    password: joi.string().required().min(8).max(32),
    username: joi.string().required().min(8).max(32),
});
