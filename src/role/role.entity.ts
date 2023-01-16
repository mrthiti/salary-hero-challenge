import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.interface';

@Entity('role')
export abstract class RoleEntity implements Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;
}
