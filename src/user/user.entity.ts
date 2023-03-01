import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Article } from 'src/article/article.entity';
import { Like } from 'src/like/like.entity';
import { Comment } from 'src/comment/comment.entity';
import { CommentReply } from 'src/comment_reply/comment_reply.entity';
import * as moment from 'moment';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  createdAt: Date;

  @Column({ nullable: true })
  @Exclude()
  refreshToken?: string;

  @OneToMany(() => Article, (article) => article.user_id)
  posts: Article[];

  @OneToMany(() => Like, (like) => like.user_id)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.user_id)
  comments: Comment[];

  @OneToMany(() => CommentReply, (commentReply) => commentReply.user_id)
  comment_replies: CommentReply[];
}
