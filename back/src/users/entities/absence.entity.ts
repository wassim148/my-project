import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entities';

@Entity()
export class Absence {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.absences, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ nullable: true })
  reason: string;
}
