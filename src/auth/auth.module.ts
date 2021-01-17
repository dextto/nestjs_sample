import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { jwtConstants } from '@auth/constants';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { LocalStrategy } from '@auth/strategies/local.strategy';
import { GoogleStrategy } from '@auth/strategies/google.strategy';
import { UserModule } from '@user/user.module';
import { AuthorizationCommandHandler } from '@auth/command/authorization.command.handler';

@Module({
  imports: [
    CqrsModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [LocalStrategy, JwtStrategy, GoogleStrategy, AuthorizationCommandHandler],
  exports: [],
})
export class AuthModule { }
