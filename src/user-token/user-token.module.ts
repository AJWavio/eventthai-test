import { Module } from '@nestjs/common';
import { UserTokenRepositoryProvider } from './db/user-token.repository';
import { UserTokenService } from './user-token.service';

@Module({
    providers: [UserTokenRepositoryProvider, UserTokenService],
    exports: [UserTokenService],
})
export class UserTokenModule {}
