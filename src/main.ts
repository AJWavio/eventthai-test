import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initMongodbConnection } from './_db/db.connection-init';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    await initMongodbConnection();
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}

bootstrap();
