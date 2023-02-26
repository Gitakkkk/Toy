import { IsString } from 'class-validator';

export class UserSignInDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
