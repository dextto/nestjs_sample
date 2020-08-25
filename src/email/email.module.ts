import { Module } from '@nestjs/common';

import { EmailSender } from 'src/email/EmailSender';

const controllers = [];

@Module({
  imports: [],
  controllers,
  providers: [EmailSender],
  exports: [EmailSender],
})
export class EmailModule { }
