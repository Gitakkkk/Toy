import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CommentReply } from 'src/comment_reply/comment_reply.entity';
import { Article } from 'src/article/article.entity';
import { User } from 'src/user/user.entity';
import * as moment from 'moment';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user_id: number;

  @ManyToOne(() => Article, (article) => article.id)
  post_id: number;

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

  @OneToMany(() => CommentReply, (commentReply) => commentReply.user_id)
  comment_replies: CommentReply[];
}
