import { IsString, IsNotEmpty } from 'class-validator';
import { ValueObject } from 'src/util/ddd/ValueObject';
import { ClassValidatorWrapper } from 'src/util/validator/ClassValidatorWrapper';

export class Email extends ValueObject<Email> {
  @IsString()
  @IsNotEmpty()
  public readonly address: string;

  constructor(address: string) {
    super();
    this.address = address;

    ClassValidatorWrapper.validate(this);
  }

  public getAddress(): string {
    return this.address;
  }
}
