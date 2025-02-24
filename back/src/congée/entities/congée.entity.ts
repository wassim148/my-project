import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // CreateDateColumn,
  // UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entities';

@Entity()
export class Conge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  employeId: number;

  @Column()
  numcin: number;

  @Column({ type: 'date' })
  dateDebut: Date;

  @Column({ type: 'date' })
  dateFin: Date;

  @Column()
  typeConge: string;

  @Column({
    type: 'enum',
    enum: ['waiting', 'accepted', 'refused'],
    default: 'waiting',
  })
  status: string;

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;
  // @Column()
  // dateHeure: string;

  @Column()
  raison: string;

  // @Column({ nullable: true })
  // piècesjustificatives?: string;

  @ManyToOne(() => User, (user) => user.conges)
  user: User;
}
