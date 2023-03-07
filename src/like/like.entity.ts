import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Article } from 'src/article/article.entity';
import { User } from 'src/user/user.entity';
import * as moment from 'moment';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  userId: User;

  @Column({ name: 'article_id' })
  article_id: number;

  @ManyToOne(() => Article, (article) => article.id)
  @JoinColumn({ name: 'article_id' })
  articleId: Article;

  @Column({
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  createdAt: Date;
}
