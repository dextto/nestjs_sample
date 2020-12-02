import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('User')
export class User {
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