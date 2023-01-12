import { IsNotEmpty, IsString } from 'class-validator';
import { User } from './user.interface';

export class UserInfoDto implements User {
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  roleId: string;
}
