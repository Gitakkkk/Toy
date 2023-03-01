import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from 'src/logger/logger.service';
import { ArticleController } from './article.controller';
import { Article } from './article.entity';
import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository, LoggerService],
})
export class ArticleModule {}
