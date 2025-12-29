import { Report } from '@prisma/client';

export interface PaginatedReports {
  reports: Report[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
