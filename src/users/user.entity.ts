import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm';
import { Sign } from 'src/signs/sign.entity';

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MEMBER = "member"
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Sign, sign => sign.user)
  signs: Sign[];

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;
}