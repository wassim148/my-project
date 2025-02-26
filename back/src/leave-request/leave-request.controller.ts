import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { LeaveRequestService } from './leave-request.service';
import { LeaveRequest } from './entities/leave-request.entity';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwt')) // Protection par authentification JWT
  @Post('request')
  async createLeaveRequest(
    @Body('userId') userId: number,
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate: Date,
  ) {
    return this.leaveRequestService.createLeaveRequest(
      userId,
      startDate,
      endDate,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('approve/:id')
  async approveLeaveRequest(@Param('id') leaveRequestId: number) {
    return this.leaveRequestService.approveLeaveRequest(leaveRequestId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('history/:userId')
  async getLeaveHistory(@Param('userId') userId: number) {
    return this.leaveRequestService.getLeaveHistory(userId);
  }
}
