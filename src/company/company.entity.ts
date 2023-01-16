import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.interface';

@Entity('company')
export abstract class CompanyEntity implements Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;
}
