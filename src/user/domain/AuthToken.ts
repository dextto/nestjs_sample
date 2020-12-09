import * as crypto from 'crypto';
import * as moment from 'moment';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { ValueObject } from '@util/ddd/ValueObject';
import { ClassValidatorWrapper } from '@util/validator/ClassValidatorWrapper';

export class AuthToken extends ValueObject<AuthToken> {
  @IsString()
  @IsNotEmpty()
  public readonly token: string;

  @IsDate()
  @IsNotEmpty()
  public readonly expiryTime: Date;

  constructor(token: string, expiryTime: Date) {
    super();
    this.token = token;
    this.expiryTime = expiryTime;

    ClassValidatorWrapper.validate(this);
  }

  public isToken(token: string): boolean {
    if (this.token.length !== token.length) {
      return false;
    }
    const targetBuffer = Buffer.from(this.token);
    const parameterBuffer = Buffer.from(token);
    return crypto.timingSafeEqual(targetBuffer, parameterBuffer);
  }

  public isExpired(): boolean {
    return moment().isAfter(this.expiryTime);
  }

  public isValidToken(token: string): boolean {
    return this.isToken(token) && !this.isExpired() ? true : false;
  }
}
