import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { Sign } from 'src/signs/sign.entity';

@Entity()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Sign)
  @JoinColumn()
  sign: Sign;
}