import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto, TokenDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginData: LoginDto): Promise<TokenDto> {
    const foundUser = await this.userService.findOneByUserName(
      loginData.username,
    );

    if (!foundUser) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    if (loginData.password === foundUser.password) {
      return {
        token: await this.jwtService.signAsync({ uuid: foundUser.uuid }),
      } as TokenDto;
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
