import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { CommentReply } from 'src/comment_reply/comment_reply.entity';
import { Like } from 'src/like/like.entity';
import { Article } from 'src/article/article.entity';
import { User } from 'src/user/user.entity';
import { Comment } from 'src/comment/comment.entity';
config();

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Article, Comment, CommentReply, Like],
  synchronize: true,
};
