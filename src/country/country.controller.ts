import {
    Controller,
    Get,
    HttpException,
    InternalServerErrorException,
    NotFoundException,
    Query,
} from '@nestjs/common';
import { CountryGetListResDto } from './dto/res/country.get-list.res.dto';
import {
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { CountryService } from './country.service';
import {
    getResponseCreatedAtString,
    getResponseId,
} from 'src/_util/response.util';
import { CountryGetOneResDto } from './dto/res/country.get-one.res.dto';
import { CountryQueryInvalidException } from './_exceptions/country.query-invalid.exception';
import { routesV1 } from 'src/_config/route.config';

@Controller()
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    @Get(routesV1.country.root)
    @ApiOkResponse({
        type: CountryGetListResDto,
        status: 200,
    })
    @ApiBadRequestResponse({
        status: 400,
    })
    @ApiInternalServerErrorResponse({
        status: 500,
    })
    async handleGetAllCountry(): Promise<CountryGetListResDto> {
        try {
            const countryDtoList = await this.countryService.getAllCountry();
            const response: CountryGetListResDto = {
                countryDataList: countryDtoList,
                createdAt: getResponseCreatedAtString(),
                id: getResponseId(),
            };

            return response;
        } catch (error) {
            if (error instanceof HttpException) throw error;

            throw new InternalServerErrorException(error);
        }
    }

    @Get(routesV1.country.queryName)
    @ApiOkResponse({
        type: CountryGetOneResDto,
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
    async handleGetCountryByName(
        @Query('name') countryName: string,
    ): Promise<CountryGetOneResDto> {
        try {
            if (countryName == null) {
                throw new CountryQueryInvalidException();
            }

            const countryDto = await this.countryService.getCountryByName(
                countryName,
            );

            if (!countryDto) throw new NotFoundException();

            const response: CountryGetOneResDto = {
                countryData: countryDto,
                createdAt: getResponseCreatedAtString(),
                id: getResponseId(),
            };

            return response;
        } catch (error) {
            if (error instanceof HttpException) throw error;

            throw new InternalServerErrorException(error);
        }
    }

    @Get(routesV1.country.queryCode)
    @ApiOkResponse({
        type: CountryGetOneResDto,
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
    async handleGetCountryByCode(
        @Query('code') countryCode: string,
    ): Promise<CountryGetOneResDto> {
        try {
            if (countryCode == null) {
                throw new CountryQueryInvalidException();
            }

            const countryDto = await this.countryService.getCountryByCode(
                countryCode,
            );

            if (!countryDto) throw new NotFoundException();

            const response: CountryGetOneResDto = {
                countryData: countryDto,
                createdAt: getResponseCreatedAtString(),
                id: getResponseId(),
            };

            return response;
        } catch (error) {
            if (error instanceof HttpException) throw error;

            throw new InternalServerErrorException(error);
        }
    }
}
