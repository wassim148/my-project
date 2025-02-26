import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveRequest } from './entities/leave-request.entity';
import { User } from 'src/users/entities/user.entities';
import { Conge } from 'src/congée/entities/congée.entity';

@Injectable()
export class LeaveRequestService {
  constructor(
    @InjectRepository(LeaveRequest)
    private leaveRequestRepository: Repository<LeaveRequest>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Conge)
    private congeRepository: Repository<Conge>,
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

  calculateDaysBetweenDates(startDate: Date, endDate: Date): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
  }

  async createLeaveRequest(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<LeaveRequest> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    const daysRequested = this.calculateDaysBetweenDates(startDate, endDate);

    if (daysRequested > user.leaveBalance) {
      throw new Error('Solde insuffisant pour cette demande de congé');
    }

    const leaveRequest = this.congeRepository.create({
      startDate,
      endDate,
      user,
    });

    return this.leaveRequestRepository.save(leaveRequest);
  }

  async approveLeaveRequest(leaveRequestId: number): Promise<void> {
    const leaveRequest = await this.congeRepository.findOne({
      where: { id: leaveRequestId },
      relations: ['user'],
    });

    if (!leaveRequest) {
      throw new Error('Demande de congé non trouvée');
    }

    if (leaveRequest.status !== 'waiting') {
      throw new Error('Cette demande a déjà été traitée');
    }

    const daysRequested = this.calculateDaysBetweenDates(
      leaveRequest.startDate,
      leaveRequest.endDate,
    );

    leaveRequest.user.leaveBalance -= daysRequested;
    await this.userRepository.save(leaveRequest.user);

    leaveRequest.status = 'approved';
    leaveRequest.approvalDate = new Date();
    await this.congeRepository.save(leaveRequest);
  }

  async getLeaveHistory(userId: number): Promise<Conge[]> {
    return this.congeRepository.find({
      where: { user: { id: userId } },
      order: { startDate: 'DESC' },
    });
  }
}
