import { IsString } from 'class-validator';

export class CommentCreateDto {
  @IsString()
  content: string;
}
