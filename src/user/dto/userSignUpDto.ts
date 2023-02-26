import { IsString } from 'class-validator';

export class UserSignUpDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
