import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
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
  @IsString()
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({
    description: 'Company ID.',
  })
  @IsString()
  @IsNotEmpty()
  companyId: number;
}
