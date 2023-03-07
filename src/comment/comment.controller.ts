import {
  Controller,
  Post,
  UseGuards,
  Request,
  Param,
  Body,
  Get,
} from '@nestjs/common';
import { JwtAccessGuard } from 'src/user/guards/access-token.guard';
import { CommentService } from './comment.service';
import { CommentCreateDto } from './dto/commentCreateDto';
import { Comment } from './comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtAccessGuard)
  @Post(':article_id')
  commentCreate(
    @Request() req: any,
    @Param('article_id') article_id: string,
    @Body() commentCreateDto: CommentCreateDto,
  ): Promise<void> {
    const user_id = req.user.id;
    return this.commentService.commentCreate(
      user_id,
      Number(article_id),
      commentCreateDto,
    );
  }

  @UseGuards(JwtAccessGuard)
  @Get()
  commentGet(@Request() req: any): Promise<Comment[]> {
    const user_id = req.user.id;
    return this.commentService.commentGet(user_id);
  }
}
