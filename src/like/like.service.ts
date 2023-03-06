import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  constructor(
    private likeRepository: LikeRepository,
    private loggerService: LoggerService,
  ) {}

  async likeCreate(user_id: number, post_id: number): Promise<void> {
    this.loggerService.info('calling likeCreate', {
      functionName: 'likeCreate',
      id: user_id,
    });
    try {
      const existLike = await this.likeRepository.findOne({
        where: {
          user_id,
          post_id,
        },
      });
      if (existLike) await this.likeRepository.delete(existLike);
      else {
        const like = this.likeRepository.create({
          user_id,
          post_id,
        });
        await this.likeRepository.save(like);
      }
    } catch (error) {
      this.loggerService.error(`new InternalServerErrorException() ${error}`, {
        functionName: 'likeCreate',
        id: user_id,
      });
      throw new InternalServerErrorException();
    }
  }
}
