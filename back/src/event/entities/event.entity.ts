import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entities';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  checkInTime: Date;

  @Column({ nullable: true })
  checkOutTime: Date;

  @ManyToOne(() => User, (user) => user.events)
  user: User;
}
