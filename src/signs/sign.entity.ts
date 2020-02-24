import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Unique, BaseEntity } from 'typeorm';
import { User } from '../users/user.entity';
// import { User } from 'src/users/user.entity';

@Entity()
@Unique(["url"])
export class Sign extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  userId: number;

  @ManyToOne(type => User, user => user.signs)
  user: User;
}
