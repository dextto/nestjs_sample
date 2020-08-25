import { Column, Model, Table, DataType, Length, IsEmail, AllowNull, Unique } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Length({ min: 2, max: 64 })
  @Column(DataType.STRING(64))
  name: string;

  @IsEmail
  @Length({ max: 128 })
  @Unique
  @Column(DataType.STRING(128))
  emailAddress: string;

  @Length({ max: 128 })
  @Column(DataType.STRING(128))
  password: string;

  @Length({ max: 128 })
  @Column(DataType.STRING(128))
  emailAuthToken: string | null;

  @AllowNull
  @Column(DataType.DATE)
  emailAuthTokenExpiryTime: Date | null;
}