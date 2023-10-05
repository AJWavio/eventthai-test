import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './_interceptors/error.interceptors';

@Module({
    imports: [CountryModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ErrorInterceptor,
        },
    ],
})
export class AppModule {}
