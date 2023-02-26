import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
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
config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userSignUpDto: UserSignUpDto): Promise<void> {
    const { username, password } = userSignUpDto;
    if (!username || !password)
      throw new BadRequestException('should not null value');
    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existUser) throw new BadRequestException('exist username');
    const salt = await bcrypt.genSalt();
    const hassedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      password: hassedPassword,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async signIn(userSignInDto: UserSignInDto): Promise<{ accessToken: string }> {
    const { username, password } = userSignInDto;
    if (!username || !password)
      throw new BadRequestException('should not null value');
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id };
      const accessToken = this.jwtService.sign(payload, {
        privateKey: process.env.ACCESS_TOKEN_SECRET_KEY,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      });
      return { accessToken };
    }
    throw new NotFoundException('do not exist username');
  }

  async updatePassword(
    userUpdatePasswordDto: UserUpdatePasswordDto,
    id: number,
  ): Promise<void> {
    const { password, updatePassword } = userUpdatePasswordDto;
    if (!password || !updatePassword)
      throw new BadRequestException('should not null value');
    const salt = await bcrypt.genSalt();
    const hassedPassword = await bcrypt.hash(updatePassword, salt);
    await this.userRepository.update(id, { password: hassedPassword });
  }

  async giveRefreshToken(id: number): Promise<{ refreshToken: string }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      const payload = { id: user.id };
      const refreshToken = this.jwtService.sign(payload, {
        privateKey: process.env.REFRESH_TOKEN_SECRET_KEY,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
      });
      await this.userRepository.update(id, { refreshToken });
      return { refreshToken };
    }
    throw new UnauthorizedException();
  }

  async giveAccessToken(id: number): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      const payload = { id: user.id };
      const accessToken = this.jwtService.sign(payload, {
        privateKey: process.env.ACCESS_TOKEN_SECRET_KEY,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      });
      return { accessToken };
    }
    throw new UnauthorizedException();
  }
}
