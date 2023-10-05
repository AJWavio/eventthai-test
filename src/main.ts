import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initMongodbConnection } from './_db/db.connection-init';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SERVER_IS_ENABLE_DOCS, SERVER_PORT } from './_config/server.config';
import { API_ROUTE_DOC } from './_config/route.config';

async function bootstrap() {
    await initMongodbConnection();
    const app = await NestFactory.create(AppModule);

    if (SERVER_IS_ENABLE_DOCS) {
        enableSwaggerDocumentation(app);
    }

    await app.listen(SERVER_PORT);
}

function enableSwaggerDocumentation(app) {
    const config = new DocumentBuilder()
        .setTitle('Eventthai Test')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Enter JWT Token',
            name: 'JWT',
            in: 'header',
        })
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(API_ROUTE_DOC, app, document);
}

bootstrap();
