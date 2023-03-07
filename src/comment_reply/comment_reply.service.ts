import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { CommentReply } from './comment_reply.entity';
import { CommentReplyRepository } from './commet_reply.repository';
import { CommentReplyCreateDto } from './dto/CommentReplyCreate.dto';

@Injectable()
export class CommentReplyService {
  constructor(
    private commentReplyRepository: CommentReplyRepository,
    private loggerService: LoggerService,
  ) {}

  async commentReplyCreate(
    user_id: number,
    commentReplyCreateDto: CommentReplyCreateDto,
  ): Promise<void> {
    const { content, comment_id } = commentReplyCreateDto;
    this.loggerService.info('calling commentReplyCreate', {
      functionName: 'commentReplyCreate',
      id: commentReplyCreateDto,
    });
    try {
      const commentReply = this.commentReplyRepository.create({
        user_id,
        comment_id,
        content,
      });
      await this.commentReplyRepository.save(commentReply);
    } catch (error) {
      this.loggerService.error(`new InternalServerErrorException() ${error}`, {
        functionName: 'commentReplyCreate',
        id: user_id,
      });
      throw new InternalServerErrorException();
    }
  }

  async commentReplyGet(user_id: number): Promise<CommentReply[]> {
    this.loggerService.info('calling commentReplyGet', {
      functionName: 'commentReplyGet',
      id: user_id,
    });
    try {
      const commentReplies = await this.commentReplyRepository.find();
      return commentReplies;
    } catch (error) {
      this.loggerService.error(`new InternalServerErrorException() ${error}`, {
        functionName: 'commentReplyGet',
        id: user_id,
      });
      throw new InternalServerErrorException();
    }
  }
}
