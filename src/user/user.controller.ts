import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserSignInDto } from './dto/userSignInDto';
import { UserSignUpDto } from './dto/userSignUpDto';
import { UserUpdatePasswordDto } from './dto/userUpdatePassword.dto';
import { JwtAccessGuard } from './guards/access-token.guard';
import { JwtRefreshGuard } from './guards/refresh-token.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  signUp(@Body() userSignUpDto: UserSignUpDto): Promise<void> {
    return this.userService.signUp(userSignUpDto);
  }

  @Post('signin')
  signIn(
    @Body() userSignInDto: UserSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(userSignInDto);
  }

  @UseGuards(JwtAccessGuard)
  @Patch('password')
  updatePassword(
    @Body() userUpdatePasswordDto: UserUpdatePasswordDto,
    @Request() req: any,
  ): Promise<void> {
    const id: number = req.user.id;
    return this.userService.updatePassword(userUpdatePasswordDto, id);
  }

  @UseGuards(JwtAccessGuard)
  @Get('refresh')
  giveRefreshToken(@Request() req: any): Promise<{ refreshToken: string }> {
    const id: number = req.user.id;
    return this.userService.giveRefreshToken(id);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('access')
  giveAccessToken(@Request() req: any): Promise<{ accessToken: string }> {
    const id: number = req.user.id;
    return this.userService.giveAccessToken(id);
  }
}
