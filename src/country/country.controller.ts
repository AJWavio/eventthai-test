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
    getResponseCreatedDateString,
    getResponseId,
} from 'src/_util/response.util';
import { CountryGetReqDto } from './dto/req/country.get.req.dto';
import { CountryGetOneResDto } from './dto/res/country.get-one.res.dto';
import { CountryQueryInvalidException } from './_exceptions/country.query-invalid.exception';
import { CountryQuery } from './database/country.query';
import { routesV1 } from 'src/config/route.config';

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
            const countryViewModelList =
                await this.countryService.getAllCountry();
            const response: CountryGetListResDto = {
                countryDataList: countryViewModelList,
                createdAt: getResponseCreatedDateString(),
                id: getResponseId(),
            };

            return response;
        } catch (error) {
            if (error instanceof HttpException) throw error;

            throw new InternalServerErrorException(error);
        }
    }

    @Get(routesV1.country.qeury)
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
    async handleGetCountryQuery(
        @Query() getDto: CountryGetReqDto,
    ): Promise<CountryGetOneResDto> {
        try {
            const { countryCode, countryName } = getDto;

            if (countryName == null && countryCode == null) {
                throw new CountryQueryInvalidException();
            }

            const countryQuery: CountryQuery = {
                countryCode,
                countryName,
            };

            const countryViewModel = await this.countryService.getCountryQuery(
                countryQuery,
            );

            if (!countryViewModel) throw new NotFoundException();

            const response: CountryGetOneResDto = {
                countryData: countryViewModel,
                createdAt: getResponseCreatedDateString(),
                id: getResponseId(),
            };

            return response;
        } catch (error) {
            if (error instanceof HttpException) throw error;

            throw new InternalServerErrorException(error);
        }
    }
}
