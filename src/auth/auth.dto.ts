import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'super_user',
    description: 'Username you wont to login.',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: '1234',
    description: 'Correact password.',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class TokenDto {
  @ApiProperty({
    description: 'Token for authentication.',
  })
  token: string;
}
