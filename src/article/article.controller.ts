import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAccessGuard } from 'src/user/guards/access-token.guard';
import { ArticleCreateDto } from './dto/articleCreateDto';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('post')
export class ArticleController {
  constructor(private postService: ArticleService) {}

  @UseGuards(JwtAccessGuard)
  @Post()
  postCreate(
    @Request() req: any,
    @Body() postCreateDto: ArticleCreateDto,
  ): Promise<void> {
    const id = req.user.id;
    return this.postService.postCreate(id, postCreateDto);
  }

  @UseGuards(JwtAccessGuard)
  @Get()
  postGet(): Promise<Article[]> {
    return this.postService.postGet();
  }
}
