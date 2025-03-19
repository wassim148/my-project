import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entities';
@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeId: number;

  @ManyToOne(() => User, (user) => user.notifications)
  employe: User;

  @Column()
  message: string;

  @Column({ nullable: true })
  type: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
