import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { RequestMoneyEntity } from './request-money.entity';
import { RequestMoneyService } from './request-money.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequestMoneyEntity]), UserModule],
  providers: [RequestMoneyService],
  exports: [RequestMoneyService],
})
export class RequestMoneyModule {}
