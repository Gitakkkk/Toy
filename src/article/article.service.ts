import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from 'src/logger/logger.service';
import { ArticleCreateDto } from './dto/articleCreateDto';
import { Article } from './article.entity';
import { ArticleRepository } from './article.repository';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: ArticleRepository,
    private readonly loggerService: LoggerService,
  ) {}

  async postCreate(id: number, postCreateDto: ArticleCreateDto): Promise<void> {
    const { title, content } = postCreateDto;
    this.loggerService.info('calling postCreate', {
      functionName: 'postCreate',
    });
    if (!title || !content) {
      this.loggerService.error(
        "new BadRequestException('should not null value')",
        {
          functionName: 'postCreate',
          id,
        },
      );
      throw new BadRequestException('should not null value');
    }
    const posting = this.articleRepository.create({
      title,
      content,
      user_id: id,
    });
    try {
      await this.articleRepository.save(posting);
    } catch (error) {
      this.loggerService.error(`new InternalServerErrorException() ${error}`, {
        functionName: 'postCreate',
        id,
      });
      throw new InternalServerErrorException();
    }
  }

  async postGet(user_id: number): Promise<Article[]> {
    this.loggerService.info('calling getPosts', {
      functionName: 'getPosts',
    });
    try {
      const posts = await this.articleRepository.find({
        where: {
          user_id,
        },
      });
      return posts;
    } catch (error) {
      this.loggerService.error(`new InternalServerErrorException() ${error}`, {
        functionName: 'postGet',
      });
      throw new InternalServerErrorException();
    }
  }
}
