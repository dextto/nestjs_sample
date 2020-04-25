import * as Axios from 'axios';
import { decamelize, camelize } from '@ridi/object-case-converter';
import { Controller, Get } from '@nestjs/common';

export interface CreateLeaveEmailUserCommandResult { }

export enum SubscriptionStatus {
  READY = 'READY',
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  IRRECOVERABLE_CANCELED = 'IRRECOVERABLE_CANCELED',
  FAILED = 'FAILED',
  TERMINATED = 'TERMINATED',
}

export interface Subscription {
  status: SubscriptionStatus;
}

@Controller('sandbox')
export class SandboxController {
  private api: Axios.AxiosInstance;

  @Get()
  async test(): Promise<CreateLeaveEmailUserCommandResult> {
    return {
      message: 'user has subscription',
      // result: null
      result: {
        status: "ACTIVE"
      }
    };
  }

  @Get('check_null')
  async check_null(): Promise<CreateLeaveEmailUserCommandResult> {
    this.api  = Axios.default.create({
      baseURL: 'http://localhost:3000',
      headers: {
        Authorization: 'none',
        'Content-Type': 'application/json',
      },
    });
    const url = `/sandbox`
    const response = await this.api.get(url);

    let status = null;
    if (response.data.result !== null) {
      status = camelize(response.data.result.status, { recursive: true });
    }
    const subscription: Subscription = {
      status: status
    }
    return subscription;
  }
}