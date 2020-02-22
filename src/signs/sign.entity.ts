import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
@Unique(["url"])
export class Sign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(type => User, user => user.signs)
  user: User;
}