import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveRequest } from './entities/leave-request.entity';

@Injectable()
export class LeaveRequestService {
  constructor(
    @InjectRepository(LeaveRequest)
    private leaveRequestRepository: Repository<LeaveRequest>,
  ) {}

  async findAll(): Promise<LeaveRequest[]> {
    return this.leaveRequestRepository.find();
  }

  async create(
    createLeaveRequestDto: Partial<LeaveRequest>,
  ): Promise<LeaveRequest> {
    const leaveRequest = this.leaveRequestRepository.create(
      createLeaveRequestDto,
    );
    return this.leaveRequestRepository.save(leaveRequest);
  }

  async update(
    id: number,
    updateLeaveRequestDto: Partial<LeaveRequest>,
  ): Promise<LeaveRequest> {
    await this.leaveRequestRepository.update(id, updateLeaveRequestDto);
    return this.leaveRequestRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.leaveRequestRepository.delete(id);
  }
}
