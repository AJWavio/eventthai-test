import * as joi from 'joi';
import { UserLoginReqDto } from './user.login.req.dto';

export const userLoginValidationSchema = joi.object<UserLoginReqDto>({
    password: joi.string().required().min(8).max(32),
    username: joi.string().required().min(8).max(32),
});
