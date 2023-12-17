import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiProperty } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

export class LoginDto {
  @ApiProperty()
  Email: string;

  @ApiProperty()
  HashedPassword: string;

  @ApiProperty()
  Username: string | null;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  @ApiBody({ type: LoginDto })
  async register(@Request() req) {
    return this.authService.register(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('access-token')
  getProfile(@Request() req) {
    return req.user;
  }
}
