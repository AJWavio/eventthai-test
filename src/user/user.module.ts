import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CountryModule } from 'src/country/country.module';
import { UserRepositoryProvider } from './database/user.repository';
import { UserService } from './user.service';
import { UserTokenModule } from 'src/user-token/user-token.module';
import { AuthModule } from 'src/_auth/auth.module';

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepositoryProvider],
    imports: [CountryModule, UserTokenModule, AuthModule],
})
export class UserModule {}
