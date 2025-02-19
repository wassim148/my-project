import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { LeaveRequestService } from './leave-request.service';
import { LeaveRequest } from './entities/leave-request.entity';

@Controller('/leave-requests')
export class LeaveRequestController {
  constructor(private leaveRequestService: LeaveRequestService) {}

  @Get()
  async findAll(): Promise<LeaveRequest[]> {
    return this.leaveRequestService.findAll();
  }

  @Post()
  async create(
    @Body() createLeaveRequestDto: Partial<LeaveRequest>,
  ): Promise<LeaveRequest> {
    return this.leaveRequestService.create(createLeaveRequestDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLeaveRequestDto: Partial<LeaveRequest>,
  ): Promise<LeaveRequest> {
    return this.leaveRequestService.update(+id, updateLeaveRequestDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.leaveRequestService.delete(+id);
  }
}
