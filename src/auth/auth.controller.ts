import { Controller, Post, UseGuards, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '@prisma/client';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.loginUser(user, response);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logoutUser(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/validate')
  async validate(@CurrentUser() user: User) {
    return user;
  }
}
