import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
} from '@nestjs/common';
import { JwtAccessGuard } from 'src/user/guards/access-token.guard';
import { CommentReply } from './comment_reply.entity';
import { CommentReplyService } from './comment_reply.service';
import { CommentReplyCreateDto } from './dto/CommentReplyCreate.dto';

@Controller('comment-reply')
export class CommentReplyController {
  constructor(private commentReplyService: CommentReplyService) {}

  @UseGuards(JwtAccessGuard)
  @Post()
  commentReplyCreate(
    @Request() req: any,
    @Body() commentReplyCreateDto: CommentReplyCreateDto,
  ): Promise<void> {
    const user_id = req.user.id;
    return this.commentReplyService.commentReplyCreate(
      user_id,
      commentReplyCreateDto,
    );
  }

  @UseGuards(JwtAccessGuard)
  @Get()
  commentReplyGet(@Request() req: any): Promise<CommentReply[]> {
    const user_id = req.user.id;
    return this.commentReplyService.commentReplyGet(user_id);
  }
}
