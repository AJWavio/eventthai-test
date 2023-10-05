import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { USER_JWT_SECRET } from 'src/_config/auth.config';
import { UserTokenModule } from 'src/user-token/user-token.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt.guard';

@Module({
    imports: [
        JwtModule.register({
            secret: USER_JWT_SECRET,
        }),
        UserTokenModule,
    ],
    providers: [JwtStrategy, JwtAuthGuard],
    exports: [JwtStrategy],
})
export class AuthModule {}
