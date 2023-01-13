import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from './user.interface';

export class UserInfoDto implements User {
  @ApiProperty({
    description: 'User ID.',
  })
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @ApiProperty({
    description: 'Username.',
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    description: 'Email.',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Role ID.',
  })
  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({
    description: 'Company ID.',
  })
  @IsNumber()
  @IsNotEmpty()
  companyId: number;

  @ApiProperty({
    description: 'Salary.',
  })
  @IsNumber()
  @IsNotEmpty()
  salary: number;
}
