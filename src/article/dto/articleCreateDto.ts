import { IsString } from 'class-validator';

export class ArticleCreateDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
