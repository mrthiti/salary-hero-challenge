import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsNumber } from 'class-validator';
import { RequestMoney } from './request-money.interface';

export class RequestMoneyDto implements RequestMoney {
  @IsEmpty()
  id?: number;

  @ApiProperty({
    example: 1000,
    description: 'Request money amount.',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEmpty()
  remainingSalary: number;

  @IsEmpty()
  userUuid: string;

  @IsEmpty()
  createAt: Date;

  @IsEmpty()
  uuid: string;
}
