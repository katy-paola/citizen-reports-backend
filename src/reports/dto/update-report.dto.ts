import { PartialType } from '@nestjs/mapped-types';
import { CreateReportDto } from './create-report.dto';
import { IsIn } from 'class-validator';

export class UpdateReportDto extends PartialType(CreateReportDto) {
  @IsIn(['pending', 'process', 'resolved'])
  status: 'pending' | 'process' | 'resolved';
}
