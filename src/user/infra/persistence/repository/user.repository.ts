import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@user/infra/persistence/entity/user.model';

@Injectable()
export class UserRepositoryWrapper {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
  ) { }

  public async createUser(
    name: string,
    emailAddress: string,
    password: string,
    salt: string,
    token: string,
    expiryTime: Date
  ): Promise<User> {
    const user = new User();
    user.name = name;
    user.emailAddress = emailAddress;
    user.password = password;
    user.passwordSalt = salt;
    user.emailAuthToken = token;
    user.emailAuthTokenExpiryTime = expiryTime;
    return this.repository.save(user);
  }

  public async findByEmail(emailAddress: string): Promise<User | null> {
    const result = await this.repository.findOne({ where: { emailAddress } });
    return result ? result : null;
  }

  public async findByEmailAuthToken(emailAuthToken: string): Promise<User | null> {
    const result = await this.repository.findOne({ where: { emailAuthToken } });
    return result ? result : null;
  }

  public async findById(id: number): Promise<User | null> {
    const result = await this.repository.findOne({ where: { id } });
    return result ? result : null;
  }

  public async updateEmailAuthTokenExpiryTime(id: number, emailAuthTokenExpiryTime: Date | null): Promise<void> {
    await this.repository.update(id, { emailAuthTokenExpiryTime });
  }
}
