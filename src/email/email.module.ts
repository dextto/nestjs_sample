import { Module } from '@nestjs/common';

import { EmailSender } from '@email/EmailSender';

const controllers = [];

@Module({
  imports: [],
  controllers,
  providers: [EmailSender],
  exports: [EmailSender],
})
export class EmailModule { }
