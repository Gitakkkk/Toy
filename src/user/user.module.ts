import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { JwtAccessStrategy } from './strategies/access-token.strategy';
import { JwtRefreshStrategy } from './strategies/refresh-token.strategy';
config();

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    JwtAccessStrategy,
    JwtRefreshStrategy,
  ],
})
export class UserModule {}
