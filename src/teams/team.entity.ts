import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, Column } from 'typeorm';
import { Sign } from 'src/signs/sign.entity';

@Entity()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  signId: number;
  
  @OneToOne(type => Sign)
  @JoinColumn()
  sign: Sign;
}