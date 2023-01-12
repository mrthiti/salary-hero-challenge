import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyDto } from './company.dto';
import { CompanyEntity } from './company.entity';
import { Company } from './company.interface';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async getCompany(companyId: number): Promise<CompanyDto> {
    const foundCompany = await this.companyRepository.findOneBy({
      id: companyId,
    });

    if (!foundCompany)
      throw new HttpException('not found', HttpStatus.NOT_FOUND);

    return foundCompany;
  }

  async addCompany(company: Company): Promise<void> {
    await this.companyRepository.insert(company);
  }

  async updateCompany(companyId: number, company: Company): Promise<void> {
    const foundCompany = await this.companyRepository.findOneBy({
      id: companyId,
    });

    if (!foundCompany)
      throw new HttpException('not found', HttpStatus.NOT_FOUND);

    delete company.id;

    const updateData = {
      ...foundCompany,
      ...company,
    };

    await this.companyRepository.save(updateData);
  }

  async deleteCompany(companyId: number): Promise<void> {
    await this.companyRepository.delete({ id: companyId });
  }
}
