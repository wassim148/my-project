import { User } from 'src/users/entities/user.entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  description: string;

  @Column({ nullable: true })
  checkInTime?: Date;

  @Column({ nullable: true })
  checkOutTime?: Date;

  @Column({ nullable: true })
  employeeId?: number;

  @ManyToOne(() => User, (user) => user.events)
  user: User;
}
