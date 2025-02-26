import { Conge } from 'src/congée/entities/congée.entity';
import { User } from 'src/users/entities/user.entities';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  data: Buffer;

  @ManyToOne(() => User, (user) => user.files)
  user: User;

  @OneToOne(() => Conge, (conge) => conge.file)
  conge: Conge;
}
