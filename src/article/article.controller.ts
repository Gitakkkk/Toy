import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Query,
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
    const user_id = req.user.id;
    return this.postService.postCreate(user_id, postCreateDto);
  }

  @UseGuards(JwtAccessGuard)
  @Get()
  postGet(@Query('user_id') user_id: string): Promise<Article[]> {
    return this.postService.postGet(Number(user_id));
  }
}
