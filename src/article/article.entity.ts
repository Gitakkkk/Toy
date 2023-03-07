import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import * as moment from 'moment';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userId: User;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  createdAt: Date;

  @Column({
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  updatedAt: Date;
}
