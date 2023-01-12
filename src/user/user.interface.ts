export interface User {
  uuid: string;
  userName: string;
  password?: string;
  email: string;
  roleId: number;
  companyId: number;
}
