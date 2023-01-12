import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { LoginDto, TokenDto } from './auth/auth.dto';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { CompanyDto } from './company/company.dto';
import { CompanyGuard } from './company/company.guard';
import { CompanyService } from './company/company.service';
import { UserInfoDto } from './user/user.dto';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
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

  @ApiTags('Company')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get Company.',
  })
  @Get('/company/:id')
  @UseGuards(AuthGuard)
  async getCompany(
    @Param('id', ParseIntPipe)
    companyId: number,
  ): Promise<CompanyDto> {
    return this.companyService.getCompany(companyId);
  }

  @ApiTags('Company')
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Add Company.',
  })
  @Post('/company')
  @UseGuards(AuthGuard, CompanyGuard)
  async addCompany(@Body() companyData: CompanyDto): Promise<void> {
    return this.companyService.addCompany(companyData);
  }

  @ApiTags('Company')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Update Company.',
  })
  @Put('/company/:id')
  @UseGuards(AuthGuard, CompanyGuard)
  async updateCompany(
    @Param('id', ParseIntPipe) companyId: number,
    @Body() companyData: CompanyDto,
  ): Promise<void> {
    return this.companyService.updateCompany(companyId, companyData);
  }

  @ApiTags('Company')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Delete Company.',
  })
  @Delete('/company/:id')
  @UseGuards(AuthGuard, CompanyGuard)
  async deleteCompany(
    @Param('id', ParseIntPipe) companyId: number,
  ): Promise<void> {
    return this.companyService.deleteCompany(companyId);
  }
}
