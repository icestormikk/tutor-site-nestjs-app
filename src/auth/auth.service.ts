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

/**
 * A service layer for user authentication and authorization
 * @export
 * @class UsersService
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  /**
   * A method for user authentication, validation, and authorization
   * @param {User} user the current user in the system
   * @param {Response} response the server's response to the request
   * @memberof AuthService
   */
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

  /**
   * A method for depriving the user of access to the system (removing the jwt token)
   * @param {Response} response
   * @return {*}  {Promise<void>}
   * @memberof AuthService
   */
  async logoutUser(response: Response): Promise<void> {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }

  /**
   * Validation of user authentication data
   * @param {LoginUserDto} user data required for authentication
   * @return {Promise<Partial<User>>} An object with user information (in case of successful verification)
   * @memberof AuthService
   */
  async validateUser({ email, password }: LoginUserDto) {
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
