import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { CommentReplyModule } from './comment_reply/comment_reply.module';
import { typeORMConfig } from './db/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    PostModule,
    CommentModule,
    LikeModule,
    CommentReplyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
