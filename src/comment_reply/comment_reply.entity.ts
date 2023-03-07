import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Comment } from 'src/comment/comment.entity';
import * as moment from 'moment';

@Entity()
export class CommentReply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  userId: User;

  @Column({ name: 'comment_id' })
  comment_id: number;

  @ManyToOne(() => Comment, (comment) => comment.id)
  @JoinColumn({ name: 'comment_id' })
  commentId: Comment;

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
