import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignInDto } from './dto/userSignInDto';
import { UserSignUpDto } from './dto/userSignUpDto';
import { UserUpdatePasswordDto } from './dto/userUpdatePassword.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
import * as bcrypt from 'bcryptjs';
import { LoggerService } from 'src/logger/logger.service';
config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {}

  async signUp(userSignUpDto: UserSignUpDto): Promise<void> {
    const { username, password } = userSignUpDto;
    this.loggerService.info('calling signUp', {
      functionName: 'signUp',
    });
    if (!username || !password)
      throw new BadRequestException('should not null value');
    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existUser) {
      this.loggerService.error("new BadRequestException('exist username')", {
        functionName: 'signUp',
        id: existUser.id,
      });
      throw new BadRequestException('exist username');
    }
    const salt = await bcrypt.genSalt();
    const hassedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      password: hassedPassword,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      this.loggerService.error(`new InternalServerErrorException() ${error}`, {
        functionName: 'signUp',
      });
      throw new InternalServerErrorException();
    }
  }

  async signIn(userSignInDto: UserSignInDto): Promise<{ accessToken: string }> {
    const { username, password } = userSignInDto;
    if (!username || !password) {
      this.loggerService.error(
        "BadRequestException('An empty value exists.')",
        {
          functionName: 'signIn',
        },
      );
      throw new BadRequestException('An empty value exists.');
    }
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id };
      const accessToken = this.jwtService.sign(payload, {
        privateKey: process.env.ACCESS_TOKEN_SECRET_KEY,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      });
      this.loggerService.info('calling signIn', {
        functionName: 'signIn',
        id: user.id,
      });
      return { accessToken };
    }
    this.loggerService.error("new NotFoundException('ID or password error.')", {
      functionName: 'signIn',
    });
    throw new NotFoundException('ID or password error.');
  }

  async updatePassword(
    userUpdatePasswordDto: UserUpdatePasswordDto,
    id: number,
  ): Promise<void> {
    const { password, updatePassword } = userUpdatePasswordDto;
    this.loggerService.info('calling updatePassword', {
      functionName: 'updatePassword',
      id,
    });
    if (!password || !updatePassword) {
      this.loggerService.error(
        "new BadRequestException('should not null value')",
        {
          functionName: 'updatePassword',
          id,
        },
      );
      throw new BadRequestException('should not null value');
    }
    try {
      const salt = await bcrypt.genSalt();
      const hassedPassword = await bcrypt.hash(updatePassword, salt);
      await this.userRepository.update(id, { password: hassedPassword });
    } catch (error) {
      this.loggerService.error(`new InternalServerErrorException() ${error}`, {
        functionName: 'updatePassword',
        id,
      });
      throw new InternalServerErrorException();
    }
  }

  async giveRefreshToken(id: number): Promise<{ refreshToken: string }> {
    this.loggerService.info('calling giveRefreshToken', {
      functionName: 'giveRefreshToken',
      id,
    });
    const payload = { id };
    const refreshToken = this.jwtService.sign(payload, {
      privateKey: process.env.REFRESH_TOKEN_SECRET_KEY,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    });
    try {
      await this.userRepository.update(id, { refreshToken });
      return { refreshToken };
    } catch (error) {
      this.loggerService.error(`new InternalServerErrorException() ${error}`, {
        functionName: 'giveRefreshToken',
        id,
      });
      throw new InternalServerErrorException();
    }
  }

  async giveAccessToken(id: number): Promise<{ accessToken: string }> {
    this.loggerService.info('calling giveAccessToken', {
      functionName: 'giveAccessToken',
      id,
    });
    try {
      const payload = { id };
      const accessToken = this.jwtService.sign(payload, {
        privateKey: process.env.ACCESS_TOKEN_SECRET_KEY,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      });
      return { accessToken };
    } catch (error) {
      this.loggerService.error(`new InternalServerErrorException() ${error}`, {
        functionName: 'giveAccessToken',
        id,
      });
      throw new InternalServerErrorException();
    }
  }
}
