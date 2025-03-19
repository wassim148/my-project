import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conge } from '../congée/entities/congée.entity';
import { User } from 'src/users/entities/user.entities';
@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(Conge)
    private leaveRepository: Repository<Conge>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getLeaveHistory(): Promise<Conge[]> {
    return this.leaveRepository.find();
  }

  async getLeaveStatistics(): Promise<any> {
    const leaves = await this.leaveRepository.find({ relations: ['user'] });
    const users = await this.userRepository.find();

    const stats = {
      totalLeaves: leaves.length,
      byDepartment: {},
      byEmployee: {},
      absenteeismRate: 0,
    };

    leaves.forEach((leave) => {
      if (leave.user) {
        const dept = leave.user.department || 'Unknown';
        stats.byEmployee[leave.user.username] =
          (stats.byEmployee[leave.user.username] || 0) + 1;
        console.log(dept);
        stats.byDepartment[dept] = (stats.byDepartment[dept] || 0) + 1;
      }
    });

    stats.absenteeismRate =
      users.length > 0 ? (leaves.length / users.length) * 100 : 0;
    return stats;
  }
}
