import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, Column } from 'typeorm';
import { User } from '../users/user.entity';
import { Team } from '../teams/team.entity';

@Entity()
export class TeamMember extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @OneToOne(type => Team)
  @JoinColumn()
  team: Team;

  @Column({default: false})
  can_read_teamsign: boolean;

  @Column({default: false})
  can_update_teamsign: boolean;

  @Column({default: false})
  can_delete_teamsign: boolean;
}