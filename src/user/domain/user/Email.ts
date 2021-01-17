import { ValueObject } from '@util/ddd/ValueObject';

export class Email extends ValueObject<Email> {
  public readonly address: string;

  constructor(address: string) {
    super();
    this.address = address;
  }

  public getAddress(): string {
    return this.address;
  }
}
