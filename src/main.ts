import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initMongodbConnection } from './_db/db.connection-init';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SERVER_PORT } from './_config/server.config';

async function bootstrap() {
    await initMongodbConnection();
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Eventpass Test')
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
    SwaggerModule.setup('docs', app, document);

    await app.listen(SERVER_PORT);
}

bootstrap();
