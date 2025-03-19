import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/enums/role.enum';
import { NotificationsService } from 'src/notification/notification.service';
import { User } from 'src/users/entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class AlertsService {
  constructor(
    private notificationsService: NotificationsService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async checkUnderstaffing() {
    const departments = await this.userRepository
      .createQueryBuilder('employee')
      .select('department')
      .distinct(true)
      .getRawMany();

    const promises = departments.map(async (dept) => {
      const staffCount = await this.userRepository.count({
        where: { department: dept.department, isAvailable: true },
      });

      if (staffCount < dept.requiredStaff) {
        const admins = await this.userRepository.find({
          where: { department: dept.department, role: Role.Admin },
        });

        const notifications = admins.map((admin) =>
          this.notificationsService.createNotification(
            admin.id,
            `ALERTE SOUS-EFFECTIF : ${dept.department} nécessite ${dept.requiredStaff} employés, actuellement ${staffCount}`,
          ),
        );

        await Promise.all(notifications);
      }
    });

    await Promise.all(promises);
  }

  async checkKeyEmployeesAbsence() {
    const keyEmployees = await this.userRepository.find({
      where: { isKeyEmployee: true },
      relations: ['absences'],
    });

    const currentDate = new Date();
    const promises = keyEmployees.map((employee) => {
      const hasOverlappingAbsence = employee.absences.some(
        (absence) =>
          absence.startDate <= currentDate && absence.endDate >= currentDate,
      );

      if (hasOverlappingAbsence) {
        return this.notificationsService.createNotification(
          employee.id,
          `ALERTE : Employé clé ${employee.username} est actuellement absent`,
        );
      }
    });

    await Promise.all(promises);
  }
}
