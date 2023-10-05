import {
    Body,
    Controller,
    Get,
    HttpException,
    InternalServerErrorException,
    NotImplementedException,
    Post,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { routesV1 } from 'src/_config/route.config';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { UserGetResDto } from './dto/res/user.get.res.dto';
import { UserCreateResDto } from './dto/res/user.create.res.dto';
import { UserCreateReqDto } from './dto/req/user.create.req.dto';
import { JoiValidationPipe } from 'src/_pipe/joi-validation.pipe';
import { userCreateValidationSchema } from './dto/req/user.create.req.validation';
import { UserLoginResDto } from './dto/res/user.login.res.dto';
import { userLoginValidationSchema } from './dto/req/user.login.req.validation';
import { UserLoginDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/_auth/jwt.guard';
import { User } from 'src/_auth/user.decorator';
import { UserSessionData } from 'src/_auth/user.session-data';
import {
    getResponseCreatedAtString,
    getResponseId,
} from 'src/_util/response.util';
import { UserLoginReqDto } from './dto/req/user.login.req.dto';
import { UserGetAllResDto } from './dto/res/user.get-all.res.dto';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(routesV1.user.root)
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: UserGetResDto,
        status: 200,
    })
    @ApiBadRequestResponse({
        status: 400,
    })
    @ApiInternalServerErrorResponse({
        status: 500,
    })
    @ApiNotFoundResponse({
        status: 404,
    })
    @ApiBearerAuth()
    async handleUserGet(
        @User() userSession: UserSessionData,
    ): Promise<UserGetResDto> {
        try {
            const { username } = userSession;
            const userDto = await this.userService.getUserByUsername(username);

            const response: UserGetResDto = {
                createdAt: getResponseCreatedAtString(),
                id: getResponseId(),
                userData: userDto,
            };

            return response;
        } catch (error) {
            if (error instanceof HttpException) throw error;

            throw new InternalServerErrorException(error);
        }
    }

    @Get(routesV1.user.getAll)
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: UserGetAllResDto,
        status: 200,
    })
    @ApiBadRequestResponse({
        status: 400,
    })
    @ApiInternalServerErrorResponse({
        status: 500,
    })
    @ApiNotFoundResponse({
        status: 404,
    })
    @ApiBearerAuth()
    async handleUserGetAll(): Promise<UserGetAllResDto> {
        try {
            const userDtoList = await this.userService.getAllUser();

            const response: UserGetAllResDto = {
                createdAt: getResponseCreatedAtString(),
                id: getResponseId(),
                userDataList: userDtoList,
            };

            return response;
        } catch (error) {
            if (error instanceof HttpException) throw error;

            throw new InternalServerErrorException(error);
        }
    }

    @Post(routesV1.user.root)
    @ApiOkResponse({
        type: UserCreateResDto,
        status: 200,
    })
    @ApiBadRequestResponse({
        status: 400,
    })
    @ApiInternalServerErrorResponse({
        status: 500,
    })
    @ApiNotFoundResponse({
        status: 404,
    })
    @UsePipes(new JoiValidationPipe(userCreateValidationSchema))
    async handleUserCreate(
        @Body() userCreateReqDto: UserCreateReqDto,
    ): Promise<UserCreateResDto> {
        try {
            const userDto = await this.userService.createUser(userCreateReqDto);
            const response: UserCreateResDto = {
                createdAt: getResponseCreatedAtString(),
                id: getResponseId(),
                userData: userDto,
            };

            return response;
        } catch (error) {
            if (error instanceof HttpException) throw error;

            throw new InternalServerErrorException(error);
        }
    }

    @Post(routesV1.user.login)
    @ApiOkResponse({
        type: UserLoginResDto,
        status: 200,
    })
    @ApiBadRequestResponse({
        status: 400,
    })
    @ApiInternalServerErrorResponse({
        status: 500,
    })
    @ApiNotFoundResponse({
        status: 404,
    })
    @UsePipes(new JoiValidationPipe(userLoginValidationSchema))
    async handleUserLogin(
        @Body() userLoginReqDto: UserLoginReqDto,
    ): Promise<UserLoginResDto> {
        try {
            const userLoginDto = await this.userService.userLogin(
                userLoginReqDto,
            );
            const response: UserLoginResDto = {
                createdAt: getResponseCreatedAtString(),
                id: getResponseId(),
                loginData: userLoginDto,
            };

            return response;
        } catch (error) {
            if (error instanceof HttpException) throw error;

            throw new InternalServerErrorException(error);
        }
    }
}
