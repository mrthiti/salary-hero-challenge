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
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto, TokenDto } from './auth/auth.dto';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { CompanyDto } from './company/company.dto';
import { CompanyRoleGuard } from './company/company-role.guard';
import { CompanyService } from './company/company.service';
import { UserInfoDto } from './user/dto/user-info.dto';
import { UserService } from './user/user.service';
import { AddUserDto } from './user/dto/add-user.dto';
import { UpdateUserDto } from './user/dto/update-user.dto';
import { RequestMoneyService } from './request-money/request-money.service';
import { RequestMoneyDto } from './request-money/request-money.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportResultDto } from './user/dto/import-user-result.dto';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
    private readonly requestMoneyService: RequestMoneyService,
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
    return this.userService.getUserInfo(req.user?.uuid);
  }

  @ApiTags('User')
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Add user success.',
    type: UserInfoDto,
  })
  @Post('/user')
  @UseGuards(AuthGuard)
  async addUserInfo(
    @Request() req,
    @Body() addUserData: AddUserDto,
  ): Promise<UserInfoDto> {
    return this.userService.addUser(req.user, addUserData);
  }

  @ApiTags('User')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Update user success.',
    type: UserInfoDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found user.',
  })
  @Put('/user/:uuid')
  @UseGuards(AuthGuard)
  async updateUser(
    @Request() req,
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() addUserData: UpdateUserDto,
  ): Promise<UserInfoDto> {
    return this.userService.updateUser(req.user, uuid, addUserData);
  }

  @ApiTags('User')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Delete user success.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found user.',
  })
  @Delete('/user/:uuid')
  @UseGuards(AuthGuard)
  async deleteUser(
    @Request() req,
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<void> {
    return this.userService.deleteUser(req.user, uuid);
  }

  @ApiTags('Company')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get Company.',
    type: CompanyDto,
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
    description: 'Add Company success.',
  })
  @Post('/company')
  @UseGuards(AuthGuard, CompanyRoleGuard)
  async addCompany(@Body() companyData: CompanyDto): Promise<CompanyDto> {
    return this.companyService.addCompany(companyData);
  }

  @ApiTags('Company')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Update Company success.',
  })
  @Put('/company/:id')
  @UseGuards(AuthGuard, CompanyRoleGuard)
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
  @UseGuards(AuthGuard, CompanyRoleGuard)
  async deleteCompany(
    @Param('id', ParseIntPipe) companyId: number,
  ): Promise<void> {
    return this.companyService.deleteCompany(companyId);
  }

  @ApiTags('Request Money')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Request Money.',
  })
  @Post('/request-money')
  @UseGuards(AuthGuard)
  async requestMoney(
    @Request() req,
    @Body() requestMoneyData: RequestMoneyDto,
  ): Promise<void> {
    return this.requestMoneyService.requestMoney(
      req.user?.uuid,
      requestMoneyData.amount,
    );
  }

  @ApiTags('User')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Import user.',
    type: ImportResultDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/user/import')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImportResultDto> {
    return this.userService.importUser(req.user, file);
  }
}
