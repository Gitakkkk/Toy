import { Module } from '@nestjs/common';
import { CommentReplyController } from './comment_reply.controller';
import { CommentReplyService } from './comment_reply.service';

@Module({
  controllers: [CommentReplyController],
  providers: [CommentReplyService]
})
export class CommentReplyModule {}
