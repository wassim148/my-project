import { Exclude } from 'class-transformer';
import { Pointage } from 'src/pointage/entities/pointage.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Conge } from 'src/congée/entities/congée.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Role } from 'src/auth/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('blob', {
    nullable: true,
    name: 'graphic',
  })
  graphic: Buffer;

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

  @Column()
  token: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  date: Date;

  @Column({ nullable: true })
  isAvailable: boolean;

  @Column({ nullable: true })
  profession: string;

  @OneToMany(() => Notification, (notifications) => notifications.user, {
    eager: true,
  })
  notifications: Notification[];

  @OneToMany(() => Pointage, (pointage) => pointage.user)
  pointages: Pointage[];

  @OneToMany(() => Conge, (conge) => conge.user)
  conges: Conge[];
}
