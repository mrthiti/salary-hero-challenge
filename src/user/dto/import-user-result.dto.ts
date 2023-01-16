import { ApiProperty } from '@nestjs/swagger';

export class ImportResultDto {
  @ApiProperty({
    description: 'Success list',
  })
  successList: string[];

  @ApiProperty({
    description: 'Fail list.',
  })
  failList: string[];
}
