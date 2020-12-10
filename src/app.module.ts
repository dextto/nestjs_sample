import { Module } from '@nestjs/common';
import { EnvModule } from './env.module';
import { DatabaseModule } from './database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [
    BatchModule,
    EnvModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
