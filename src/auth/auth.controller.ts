import { Controller, Post, UseGuards, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '@prisma/client';
import { Public } from './decorators/public.decorator';

/**
 * The controller is used to authenticate users, as well as to deprive them of access to the server
 * @export
 * @class AuthController
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Handler of the user authentication request using his username and password
   * @param {User} user the current user in the system
   * @param {Response} response the server's response to the request
   * @memberof AuthController
   */
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.loginUser(user, response);
  }

  /**
   * The handler of the user's logout request
   * @param {Response} response
   * @memberof AuthController
   */
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logoutUser(response);
  }

  /**
   * Validation of a user who is in the context
   * @param {User} user the user from the context
   * @memberof AuthController
   */
  @UseGuards(JwtAuthGuard)
  @Get('/validate')
  async validate(@CurrentUser() user: User) {
    return user;
  }
}
