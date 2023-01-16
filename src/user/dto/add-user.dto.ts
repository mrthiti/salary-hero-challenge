import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../user.interface';

export class AddUserDto implements User {
  uuid: string;

  @ApiProperty({
    example: 'thiti',
    description: 'Username.',
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    example: '1234',
    description: 'Password.',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'thiti@thiti.dev',
    description: 'Email.',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 1,
    description: 'Role ID.',
  })
  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({
    example: 1,
    description: 'Company ID.',
  })
  @IsNumber()
  @IsNotEmpty()
  companyId: number;

  @ApiProperty({
    example: 18000,
    description: 'Salary.',
  })
  @IsNumber()
  @IsNotEmpty()
  salary: number;
}
