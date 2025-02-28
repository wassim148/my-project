import { Controller, Get, Res } from '@nestjs/common';
import { HistoryService } from './history.service';
import { Response } from 'express';
import * as XLSX from 'xlsx';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('leaves')
  getLeaves() {
    return this.historyService.getLeaveHistory();
  }

  @Get('statistics')
  getStatistics() {
    return this.historyService.getLeaveStatistics();
  }

  @Get('export')
  async exportToExcel(@Res() res: Response) {
    const data = await this.historyService.getLeaveHistory();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leaves');
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename="leaves.xlsx"');
    res.send(buffer);
  }
}
