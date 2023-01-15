import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { RequestMoneyEntity } from './request-money.entity';
import { DateTime } from 'luxon';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RequestMoneyService {
  constructor(
    @InjectRepository(RequestMoneyEntity)
    private readonly requestMoneyRepository: Repository<RequestMoneyEntity>,
    private readonly userService: UserService,
  ) {}

  async requestMoney(userUuid: string, amount: number) {
    if (amount <= 0)
      throw new HttpException('amount > 1', HttpStatus.BAD_REQUEST);

    const startDate = DateTime.now().startOf('month').toISO();
    const endDate = DateTime.now().endOf('month').toISO();

    const { sum: requestMoneySum } = await this.requestMoneyRepository
      .createQueryBuilder('request_money')
      .select('SUM(request_money.amount)', 'sum')
      .where({
        userUuid,
        createAt: Between(new Date(startDate), new Date(endDate)),
      })
      .getRawOne();

    const user = await this.userService.findOneByUuid(userUuid);
    if (!user) throw new HttpException('not found.', HttpStatus.NOT_FOUND);

    const currentRemainingSalary = user.salary - requestMoneySum;
    const newRemainingSalary = currentRemainingSalary - amount;

    if (newRemainingSalary < user.salary * 0.5)
      throw new HttpException(
        'requested amount for that month is not going to be over 50% of salary.',
        HttpStatus.BAD_REQUEST,
      );

    const dataAdd: RequestMoneyEntity = {
      userUuid,
      amount,
      remainingSalary: newRemainingSalary,
      createAt: new Date(DateTime.now().toISO()),
    };

    await this.requestMoneyRepository.insert(dataAdd);
  }
}
