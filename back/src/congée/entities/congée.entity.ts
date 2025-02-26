import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entities';
import { File } from 'src/file/entities/file.entity';

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
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column()
  typeConge: string;

  @Column({
    type: 'enum',
    enum: ['waiting', 'accepted', 'refused'],
    default: 'waiting',
  })
  status: string;

  @Column({ nullable: true })
  approvalDate: Date;

  @Column()
  raison: string;

  @Column({ default: 'waiting' })
  approvalStatus: string;

  @Column({ default: 0 })
  nombreJours: number;

  @OneToOne(() => File, (file) => file.conge)
  file: File;

  @ManyToOne(() => User, (user) => user.conges)
  user: User;

  @ManyToOne(() => User, (user) => user.conges)
  employe: User;
}
