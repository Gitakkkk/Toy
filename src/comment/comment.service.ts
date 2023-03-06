import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { CommentRepository } from './comment.repository';
import { CommentCreateDto } from './dto/commentCreateDto';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private loggerService: LoggerService,
  ) {}

  async commentCreate(
    user_id: number,
    post_id: number,
    commentCreateDto: CommentCreateDto,
  ): Promise<void> {
    this.loggerService.info('calling commentCreate', {
      functionName: 'commentCreate',
      id: user_id,
    });
    try {
      const comment = this.commentRepository.create({
        user_id,
        post_id,
        content: commentCreateDto.content,
      });
      await this.commentRepository.save(comment);
    } catch (error) {
      this.loggerService.error(`new InternalServerErrorException() ${error}`, {
        functionName: 'commentCreate',
        id: user_id,
      });
      throw new InternalServerErrorException();
    }
  }

  async commentGet(user_id: number): Promise<Comment[]> {
    this.loggerService.info('calling commentGet', {
      functionName: 'commentGet',
      id: user_id,
    });
    try {
      const comments = await this.commentRepository.find();
      return comments;
    } catch (error) {
      this.loggerService.error(`new InternalServerErrorException() ${error}`, {
        functionName: 'commentGet',
        id: user_id,
      });
      throw new InternalServerErrorException();
    }
  }
}
