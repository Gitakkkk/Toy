import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from 'src/logger/logger.service';
import { CommentReplyController } from './comment_reply.controller';
import { CommentReply } from './comment_reply.entity';
import { CommentReplyService } from './comment_reply.service';
import { CommentReplyRepository } from './commet_reply.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentReply])],
  controllers: [CommentReplyController],
  providers: [CommentReplyService, CommentReplyRepository, LoggerService],
})
export class CommentReplyModule {}
