import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../user.interface';

export class UpdateUserDto implements User {
  @ApiProperty({
    example: 'fae0eee9-6134-4781-9784-db81ed6ec426',
    description: 'User ID.',
  })
  @IsString()
  @IsOptional()
  uuid: string;

  @ApiProperty({
    example: 'thiti',
    description: 'Username.',
  })
  @IsString()
  @IsOptional()
  userName: string;

  @ApiProperty({
    example: '1234',
    description: 'Password.',
  })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({
    example: 'thiti@thiti.dev',
    description: 'Email.',
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: 1,
    description: 'Role ID.',
  })
  @IsNumber()
  @IsOptional()
  roleId: number;

  @ApiProperty({
    example: 1,
    description: 'Company ID.',
  })
  @IsNumber()
  @IsOptional()
  companyId: number;

  @ApiProperty({
    example: 30000,
    description: 'Salary.',
  })
  @IsNumber()
  @IsOptional()
  salary: number;
}
