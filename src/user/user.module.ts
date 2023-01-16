import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';
import { RoleModule } from 'src/role/role.module';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RoleModule, CompanyModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
