import { Report } from '@prisma/client';

export interface PaginatedReports {
  data: Report[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
