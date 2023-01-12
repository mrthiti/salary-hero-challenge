import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
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

  @ApiTags('Authentication')
  @Post('/auth/login')
  @ApiResponse({
    status: 201,
    description: 'The token',
    type: TokenDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async login(@Body() loginData: LoginDto): Promise<TokenDto> {
    return this.authService.login(loginData);
  }

  @ApiTags('User')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User infomation.',
    type: UserInfoDto,
  })
  @Get('/user/info')
  @UseGuards(AuthGuard)
  async getUserInfo(@Request() req): Promise<UserInfoDto> {
    return this.userService.getUserInfo(req.uuid);
  }
}
