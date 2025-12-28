import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('api/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  async findAllReports(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.reportsService.findAllReports(
      Number(page) || 1,
      Number(pageSize) || 10,
    );
  }

  @Get(':id')
  async findReportById(@Param('id') id: string) {
    return this.reportsService.findReportById(Number(id));
  }

  @Post()
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async createReport(@Body() data: CreateReportDto) {
    return this.reportsService.createReport(data);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(':id')
  async updateReport(@Param('id') id: string, @Body() data: UpdateReportDto) {
    return this.reportsService.updateReport(Number(id), data);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async deleteReport(@Param('id') id: string) {
    return this.reportsService.deleteReport(Number(id));
  }
}
