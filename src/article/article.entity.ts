import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Like } from 'src/like/like.entity';
import { User } from 'src/user/user.entity';
import { Comment } from 'src/comment/comment.entity';
import * as moment from 'moment';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user_id: number;

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

  @OneToMany(() => Comment, (comment) => comment.user_id)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user_id)
  likes: Like[];
}
