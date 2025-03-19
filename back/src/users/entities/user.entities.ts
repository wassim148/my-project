import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Conge } from 'src/congée/entities/congée.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Role } from 'src/auth/enums/role.enum';
import { Event } from 'src/event/entities/event.entity';
import { LeaveRequest } from 'src/leave-request/entities/leave-request.entity';
import { File } from 'src/file/entities/file.entity';
import { Absence } from './absence.entity';
// import { Departement } from 'src/departement/entities/departement.entity';
// import { Project } from 'src/project/entities/project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('blob', {
    nullable: true,
    name: 'graphic',
  })
  avatar: string;

  @Column()
  username: string;

  @Column()
  numcin: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Exclude()
  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Exclude()
  @Column({ default: false, select: false })
  userVerified: boolean;

  @Column({ default: false })
  isKeyEmployee: boolean;

  @Column()
  token: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  date: Date;

  @Column({ nullable: true })
  isAvailable: boolean;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  projects: string;

  // @ManyToOne(() => Departement, (departement) => departement.employees)
  // departement: Departement[];

  // @ManyToOne(() => Project, (projrcts) => projrcts.employees)
  // projrcts: Project[];

  @Column({ default: 45 })
  leaveBalance: number;

  @OneToMany(() => Notification, (notifications) => notifications.employe, {
    eager: true,
  })
  notifications: Notification[];

  @OneToMany(() => Conge, (conge) => conge.user)
  conges: Conge[];

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];

  @OneToMany(() => LeaveRequest, (leaveRequest) => leaveRequest.user)
  leaveRequests: LeaveRequest[];

  @OneToMany(() => File, (file) => file.user)
  files: File;

  @OneToMany(() => Absence, (absence) => absence.user, { eager: true })
  absences: Absence[];
}
