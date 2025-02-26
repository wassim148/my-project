import { User } from 'src/users/entities/user.entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class LeaveRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employee: string;

  // @Column()
  // startDate: Date;

  // @Column()
  // endDate: Date;

  // @Column({ default: 'waiting' })
  // status: string;

  // @Column({ nullable: true })
  // approvalDate: Date;

  @ManyToOne(() => User, (user) => user.leaveRequests)
  user: User;
}
