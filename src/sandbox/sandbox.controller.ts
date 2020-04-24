import { Controller, Get } from '@nestjs/common';

@Controller('sandbox')
export class SandboxController {
  @Get()
  async test(): Promise<CreateLeaveEmailUserCommandResult> {
    return {
      message: 'user has subscription',
      result: null
    };
  }
}

export interface CreateLeaveEmailUserCommandResult { }

export enum SubscriptionStatus {
  READY = 'READY',
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  IRRECOVERABLE_CANCELED = 'IRRECOVERABLE_CANCELED',
  FAILED = 'FAILED',
  TERMINATED = 'TERMINATED',
}