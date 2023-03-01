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

  async postCreate(postCreateDto: ArticleCreateDto): Promise<void> {
    const { title, content } = postCreateDto;
    this.loggerService.info('calling postCreate', {
      functionName: 'postCreate',
    });
    if (!title || !content) {
      this.loggerService.error(
        "new BadRequestException('should not null value')",
        {
          functionName: 'postCreate',
        },
      );
      throw new BadRequestException('should not null value');
    }
    const posting = this.articleRepository.create({
      title,
      content,
    });
    try {
      await this.articleRepository.save(posting);
    } catch (error) {
      this.loggerService.error(`new InternalServerErrorException() ${error}`, {
        functionName: 'postCreate',
      });
      throw new InternalServerErrorException();
    }
  }

  async postGet(): Promise<Article[]> {
    this.loggerService.info('calling getPosts', {
      functionName: 'getPosts',
    });
    try {
      const posts = await this.articleRepository.find();
      return posts;
    } catch (error) {
      this.loggerService.error(`new InternalServerErrorException() ${error}`, {
        functionName: 'postGet',
      });
      throw new InternalServerErrorException();
    }
  }
}
