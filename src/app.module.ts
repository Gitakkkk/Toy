import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { CommentReplyModule } from './comment_reply/comment_reply.module';
import { typeORMConfig } from './db/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    ArticleModule,
    CommentModule,
    LikeModule,
    CommentReplyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
