import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInfoDto } from './user.dto';
import { UserEntity } from './user.entity';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserInfo(uuid: string): Promise<UserInfoDto> {
    const foundUser = await this.findOneByUuid(uuid);

    if (!foundUser)
      throw new HttpException('not found user', HttpStatus.NOT_FOUND);

    delete foundUser.password;

    return foundUser as UserInfoDto;
  }

  async findOneByUserName(userName: string): Promise<User> {
    if (!userName) return null;

    const foundUser = await this.userRepository.findOneBy({
      userName,
    });

    return foundUser;
  }

  async findOneByUuid(uuid: string): Promise<User> {
    if (!uuid) return null;

    const foundUser = await this.userRepository.findOneBy({
      uuid,
    });

    return foundUser;
  }
}
