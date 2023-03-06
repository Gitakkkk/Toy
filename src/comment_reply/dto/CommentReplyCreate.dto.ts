import { IsString, IsNumber } from 'class-validator';

export class CommentReplyCreateDto {
  @IsString()
  content: string;

  @IsNumber()
  comment_id: number;
}
