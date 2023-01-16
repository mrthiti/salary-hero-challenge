export interface RequestMoney {
  id?: number;
  amount: number;
  remainingSalary: number;
  userUuid: string;
  createAt: Date;
}
