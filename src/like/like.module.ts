import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from 'src/logger/logger.service';
import { LikeController } from './like.controller';
import { Like } from './like.entity';
import { LikeRepository } from './like.repository';
import { LikeService } from './like.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository, LoggerService],
})
export class LikeModule {}
