import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, LoggerService],
})
export class CommentModule {}
