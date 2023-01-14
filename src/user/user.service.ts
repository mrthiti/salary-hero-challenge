import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInfoDto } from './dto/user-info.dto';
import { UserEntity } from './user.entity';
import { User } from './user.interface';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CompanyService } from 'src/company/company.service';
import { RoleService } from 'src/role/role.service';
import { AddUserDto } from './dto/add-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly companyService: CompanyService,
    private readonly roleService: RoleService,
  ) {}

  async getUserInfo(uuid: string): Promise<UserInfoDto> {
    const foundUser = await this.findOneByUuid(uuid);

    if (!foundUser)
      throw new HttpException('not found user', HttpStatus.NOT_FOUND);

    delete foundUser.password;

    return foundUser as UserInfoDto;
  }

  async addUser(user: User, addUserData: AddUserDto): Promise<UserInfoDto> {
    let allowAdd = false;
    switch (user.roleId) {
      case 1:
        allowAdd = true;
        break;
      case 2:
        const allowRoleToAdd = { 2: true, 3: true };
        allowAdd =
          user.companyId === addUserData.companyId &&
          allowRoleToAdd[addUserData.roleId];
        break;
    }
    if (!allowAdd)
      throw new HttpException('forbidden resource.', HttpStatus.FORBIDDEN);

    const existRole = await this.roleService.existRole(addUserData.roleId);
    if (!existRole)
      throw new HttpException('wrong role.', HttpStatus.BAD_REQUEST);

    const existCompany = await this.companyService.existCompany(
      addUserData.companyId,
    );
    if (!existCompany)
      throw new HttpException('wrong company.', HttpStatus.BAD_REQUEST);

    addUserData.uuid = uuidv4();
    addUserData.password = await bcrypt.hash(
      addUserData.password,
      await bcrypt.genSalt(),
    );

    await this.userRepository.insert(addUserData);

    delete addUserData.password;

    return addUserData as UserInfoDto;
  }

  async updateUser(
    user: User,
    uuid: string,
    userUpdateData: User,
  ): Promise<UserInfoDto> {
    const foundUser = await this.findOneByUuid(uuid);
    if (!foundUser) throw new HttpException('not found', HttpStatus.NOT_FOUND);

    let allowAdd = false;
    const dataUpdate = { ...foundUser, ...userUpdateData };
    switch (user.roleId) {
      case 1:
        allowAdd = true;
        break;
      case 2: {
        const allowRoleToAdd = { 2: true, 3: true };
        allowAdd =
          user.companyId === foundUser.companyId &&
          user.companyId === dataUpdate.companyId &&
          allowRoleToAdd[foundUser.roleId] &&
          allowRoleToAdd[dataUpdate.roleId];
        break;
      }
    }
    if (!allowAdd)
      throw new HttpException('forbidden resource.', HttpStatus.BAD_REQUEST);

    const existRole = await this.roleService.existRole(dataUpdate.roleId);
    if (!existRole)
      throw new HttpException('wrong role.', HttpStatus.BAD_REQUEST);

    const existCompany = await this.companyService.existCompany(
      dataUpdate.companyId,
    );
    if (!existCompany)
      throw new HttpException('wrong company.', HttpStatus.BAD_REQUEST);

    if (userUpdateData.password) {
      dataUpdate.password = await bcrypt.hash(
        userUpdateData.password,
        await bcrypt.genSalt(),
      );
    }

    await this.userRepository.save(dataUpdate);

    delete dataUpdate.password;

    return dataUpdate as UserInfoDto;
  }

  async deleteUser(user: User, uuid: string): Promise<void> {
    const foundUser = await this.findOneByUuid(uuid);
    let allowDelete = false;
    switch (user.roleId) {
      case 1:
        allowDelete = true;
        break;
      case 2:
        allowDelete = user.companyId === foundUser.companyId;
        break;
    }
    if (!allowDelete)
      throw new HttpException('forbidden resource.', HttpStatus.FORBIDDEN);

    await this.userRepository.delete({ uuid });
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
