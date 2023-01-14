import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../user.interface';

export class UpdateUserDto implements User {
  @ApiProperty({
    description: 'User ID.',
  })
  @IsString()
  @IsOptional()
  uuid: string;

  @ApiProperty({
    description: 'Username.',
  })
  @IsString()
  @IsOptional()
  userName: string;

  @ApiProperty({
    description: 'Password.',
  })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({
    description: 'Email.',
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'Role ID.',
  })
  @IsNumber()
  @IsOptional()
  roleId: number;

  @ApiProperty({
    description: 'Company ID.',
  })
  @IsNumber()
  @IsOptional()
  companyId: number;

  @ApiProperty({
    description: 'Salary.',
  })
  @IsNumber()
  @IsOptional()
  salary: number;
}
