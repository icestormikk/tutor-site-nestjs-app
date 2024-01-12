import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { LoginUserDto } from './users/dto/login-user.dto';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

export type TokenPayload = {
  id: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async loginUser(user: User, response: Response) {
    const { id } = user;

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get<number>('JWT_EXPIRATION'),
    );
    const token = await this.jwtService.signAsync({ id });

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }

  async logoutUser(response: Response): Promise<void> {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }

  async validateUser({
    email,
    password,
  }: LoginUserDto): Promise<Partial<User>> {
    const user = await this.usersService.findUser({ email });
    const isPasswordsEqual = await compare(String(password), user.password);

    if (user && isPasswordsEqual) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }
}
