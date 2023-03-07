import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CommentReply } from 'src/comment_reply/comment_reply.entity';
import { Article } from 'src/article/article.entity';
import { User } from 'src/user/user.entity';
import * as moment from 'moment';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userId: User;

  @Column({ name: 'article_id' })
  article_id: number;

  @ManyToOne(() => Article, (article) => article.id)
  @JoinColumn({ name: 'article_id' })
  articleId: Article;

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
