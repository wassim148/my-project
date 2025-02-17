import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entities';

@Entity()
export class Conge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeId: number;

  @Column()
  numcin: number;

  @Column({ type: 'date' })
  dateDebut: string;

  @Column({ type: 'date' })
  dateFin: string;

  @Column()
  typeConge: string;

  @Column({
    type: 'enum',
    enum: ['waiting', 'accepted', 'refused'],
    default: 'waiting',
  })
  status: 'waiting' | 'accepted' | 'refused';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  raison: string;

  @Column()
  dateHeure: string;

  @ManyToOne(() => User, (user) => user.conges)
  user: User;
}
