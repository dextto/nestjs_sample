import { ValueObject } from '@util/ddd/ValueObject';

import { Email } from '@user/domain/user/Email';

export class Profile extends ValueObject<Profile> {
  public readonly name: string | null;

  public readonly email: Email | null;

  public readonly picture: string | null;

  constructor(
    name: string | null,
    email: Email | null,
    picture: string | null,
  ) {
    super();
    this.name = name;
    this.email = email;
    this.picture = picture;
  }
}