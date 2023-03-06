import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Param,
} from '@nestjs/common';
import { JwtAccessGuard } from 'src/user/guards/access-token.guard';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @UseGuards(JwtAccessGuard)
  @Post(':post_id')
  likeCreate(
    @Request() req: any,
    @Param('post_id') post_id: string,
  ): Promise<void> {
    const user_id = req.user.id;
    return this.likeService.likeCreate(user_id, Number(post_id));
  }
}
