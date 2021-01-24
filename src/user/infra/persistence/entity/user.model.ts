import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  name: string;

  @Column({ length: 128, unique: true })
  emailAddress: string;

  @Column({ length: 128 })
  password: string;

  @Column({ length: 32 })
  passwordSalt: string;

  @Column({ length: 128, nullable: true })
  emailAuthToken: string | null;

  @Column('datetime', { nullable: true })
  emailAuthTokenExpiryTime: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}