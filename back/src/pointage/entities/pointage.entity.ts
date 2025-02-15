import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entities';

@Entity('pointages')
export class Pointage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.pointages, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  heureArrivee: string;

  @Column({ type: 'time', nullable: true })
  heureDepart: string;
}
