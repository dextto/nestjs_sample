import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '@user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorizationCommandHandler } from './command/authorization.command.handler';

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
  providers: [LocalStrategy, JwtStrategy, AuthorizationCommandHandler],
  exports: [],
})
export class AuthModule { }
