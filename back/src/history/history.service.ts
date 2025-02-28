import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conge } from '../congée/entities/congée.entity';
// import { User } from 'src/users/entities/user.entities';
@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(Conge)
    private congeRepository: Repository<Conge>,
    // @InjectRepository(User)
    // private userRepository: Repository<User>,
  ) {}

  async getLeaveHistory(): Promise<Conge[]> {
    return this.congeRepository.find();
  }

  async getLeaveStatistics(): Promise<any> {
    const leaves = await this.congeRepository.find();
    const stats = {
      totalLeaves: leaves.length,
      byDepartment: {},
      byEmployee: {},
    };
    leaves.forEach((Conge) => {
      stats.byEmployee[Conge.employeId] =
        (stats.byEmployee[Conge.employeId] || 0) + 1;
      //   stats.byDepartment[User.profession] =
      //     (stats.byDepartment[User.profession] || 0) + 1;
    });
    return stats;
  }
}
