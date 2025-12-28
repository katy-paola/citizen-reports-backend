import { Injectable, NotFoundException } from '@nestjs/common';
import { Report } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatedReports } from 'src/types/report';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async findAllReports(page = 1, pageSize = 10): Promise<PaginatedReports> {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.prisma.report.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.report.count(),
    ]);
    return {
      data,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async findReportById(id: number): Promise<Report | null> {
    const report = this.prisma.report.findUnique({
      where: {
        id,
      },
    });

    if (report === null) console.log('Report not found');

    return report;
  }

  async createReport(data: CreateReportDto): Promise<Report> {
    return this.prisma.report.create({
      data: {
        title: data.title,
        description: data.description,
        status: 'pending',
      },
    });
  }

  async updateReport(id: number, data: UpdateReportDto): Promise<Report> {
    const report = await this.prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return this.prisma.report.update({
      where: { id },
      data: {
        status: data.status,
      },
    });
  }

  async deleteReport(id: number): Promise<Report> {
    return this.prisma.report.delete({
      where: {
        id,
      },
    });
  }
}
