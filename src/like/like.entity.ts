import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Article } from 'src/article/article.entity';
import { User } from 'src/user/user.entity';
import * as moment from 'moment';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user_id: number;

  @ManyToOne(() => Article, (article) => article.id)
  post_id: number;

  @Column({
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  createdAt: Date;
}
