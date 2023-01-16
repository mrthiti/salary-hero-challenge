import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Company } from './company.interface';

export class CompanyDto implements Company {
  id: number;

  @ApiProperty({
    example: 'My Company',
    description: 'Company name.',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
