import { HttpException, HttpStatus } from '@nestjs/common';
import { MessageFormatter } from 'class-validator-message-formatter';

export interface Constraint {
  field: string;
  message: string;
}

export class ValidationFailedException extends HttpException {
  private constraints: Constraint[];

  constructor(validationErrors) {
    super('Validation failed', HttpStatus.BAD_REQUEST);
    this.constraints = MessageFormatter.format(validationErrors);
  }

  public getConstraints(): Constraint[] {
    return this.constraints;
  }
}
