import { User } from 'src/users/entities/user.entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class LeaveRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employee: string;

  @Column()
  type: string;

  @Column()
  period: string;

  @Column({ default: 'En attente' })
  status: string;

  @ManyToOne(() => User, (user) => user.leaveRequests)
  user: User;
}
