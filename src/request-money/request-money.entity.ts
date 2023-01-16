import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RequestMoney } from './request-money.interface';

@Entity('request_money')
export abstract class RequestMoneyEntity implements RequestMoney {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'remaining_salary' })
  remainingSalary: number;

  @Column({ name: 'user_uuid' })
  userUuid: string;

  @Column({ name: 'create_at' })
  createAt: Date;
}
