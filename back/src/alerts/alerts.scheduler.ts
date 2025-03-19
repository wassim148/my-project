import { Injectable } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AlertsScheduler {
  constructor(private alertsService: AlertsService) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  handleUnderstaffingCheck() {
    this.alertsService.checkUnderstaffing();
  }

  @Cron(CronExpression.EVERY_HOUR)
  handleKeyEmployeesCheck() {
    this.alertsService.checkKeyEmployeesAbsence();
  }
}
