import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.interface';

@Entity('user')
export abstract class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'role_id' })
  roleId: string;

  @Column({ name: 'company_id' })
  companyId: string;
}
