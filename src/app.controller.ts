import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LoginDto, TokenDto } from './auth/auth.dto';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { UserInfoDto } from './user/user.dto';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/auth/login')
  async login(@Body() loginData: LoginDto): Promise<TokenDto> {
    return this.authService.login(loginData);
  }

  @Get('/user/info')
  @UseGuards(AuthGuard)
  async getUserInfo(@Request() req): Promise<UserInfoDto> {
    return this.userService.getUserInfo(req.uuid);
  }
}
