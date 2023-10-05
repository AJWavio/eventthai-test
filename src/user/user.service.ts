import {
    BadRequestException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import {
    USER_REPO_PROVIDER_TOKEN,
    UserRepository,
} from './database/user.repository';
import { UserDto, UserLoginDto } from './dto/user.dto';
import { UserCreateReqDto } from './dto/req/user.create.req.dto';
import { CountryDto } from 'src/country/dto/country.dto';
import { Country } from 'src/country/database/country';
import {
    COUNTRY_REPO_PROVIDER_TOKEN,
    CountryRepository,
} from 'src/country/database/country.repository';
import { Ref } from '@typegoose/typegoose';
import { comparePasswordHash, getPasswordHash } from 'src/_util/auth.util';
import { UserLoginReqDto } from './dto/req/user.login.req.dto';
import { UserJwtPayload } from '../_auth/user.jwt-payload';
import { generateJwt } from 'src/_util/jwt.util';
import { UserTokenService } from 'src/user-token/user-token.service';
import { UserUsernameAlreadyUsedException } from './_exceptions/username-already-used.exception';
import { UserEmailAlreadyUsedException } from './_exceptions/email-already-used.exception';
import { UserInvalidCredentialException } from './_exceptions/invalid-credential.exception';

@Injectable()
export class UserService {
    constructor(
        private readonly userTokenService: UserTokenService,

        @Inject(USER_REPO_PROVIDER_TOKEN)
        private readonly userRepository: UserRepository,

        @Inject(COUNTRY_REPO_PROVIDER_TOKEN)
        private readonly countryRepository: CountryRepository,
    ) {}

    async getAllUser(): Promise<UserDto[]> {
        const userDocList = await this.userRepository.findAll(true);

        const userDtoList: UserDto[] = [];

        for (const userDoc of userDocList) {
            const country = userDoc.country as Country;

            const countryDto: CountryDto = {
                countryCode: country.code,
                countryName: country.name,
            };

            const userDto: UserDto = {
                countryData: countryDto,
                email: userDoc.email,
                username: userDoc.username,
            };
            userDtoList.push(userDto);
        }

        return userDtoList;
    }

    async getUserByUsername(username: string): Promise<UserDto | null> {
        const userDoc = await this.userRepository.findByUsername(
            username,
            true,
        );

        if (!userDoc) return null;

        const country = userDoc.country as Country;

        const countryDto: CountryDto = {
            countryCode: country.code,
            countryName: country.name,
        };

        const userDto: UserDto = {
            countryData: countryDto,
            email: userDoc.email,
            username: userDoc.username,
        };

        return userDto;
    }

    async createUser(userCreateReqDto: UserCreateReqDto): Promise<UserDto> {
        const { countryCode, email, password, username } = userCreateReqDto;

        const duplicateUserNameResult =
            await this.userRepository.checkDuplicateUsername(username);
        if (duplicateUserNameResult)
            throw new UserUsernameAlreadyUsedException(username);

        const duplicateEmailResult =
            await this.userRepository.checkDuplicateEmail(email);
        if (duplicateEmailResult)
            throw new UserEmailAlreadyUsedException(email);

        const countryDoc = (await this.countryRepository.findOneByCode(
            countryCode,
        )) as Ref<Country>;

        const passwordHash = await getPasswordHash(password);

        const userDoc = await this.userRepository.createOne({
            email,
            username,
            country: countryDoc,
            password_hash: passwordHash,
        });

        if (!userDoc) throw new InternalServerErrorException();

        const countryJson = countryDoc.toJSON() as Country;
        const countryDto: CountryDto = {
            countryCode: countryJson.code,
            countryName: countryJson.name,
        };
        const userDto: UserDto = {
            countryData: countryDto,
            email: userDoc.email,
            username: userDoc.username,
        };

        return userDto;
    }

    async userLogin(userLoginReqDto: UserLoginReqDto): Promise<UserLoginDto> {
        const { username, password: pwd } = userLoginReqDto;

        const userDoc = await this.userRepository.findByUsername(
            username,
            true,
        );

        if (!userDoc) throw new NotFoundException();

        const docPwd = userDoc.password_hash;
        const pwdCompareResult = await comparePasswordHash(pwd, docPwd);

        if (!pwdCompareResult) throw new UserInvalidCredentialException();

        const userJwtPayload: UserJwtPayload = {
            username,
            email: userDoc.email,
        };

        const token = generateJwt(userJwtPayload);

        await this.userTokenService.createUserTokenDb(username, token);

        const userLoginDto: UserLoginDto = {
            token,
        };

        return userLoginDto;
    }
}
