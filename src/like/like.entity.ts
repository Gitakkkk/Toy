import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';
import * as moment from 'moment';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user_id: User;

  @ManyToOne(() => Post, (post) => post.id)
  post_id: Post;

  @Column({
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  createdAt: Date;
}
