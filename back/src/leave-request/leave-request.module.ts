import { Module } from '@nestjs/common';
import { LeaveRequestController } from './leave-request.controller';
import { LeaveRequestService } from './leave-request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRequest } from './entities/leave-request.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entities';
import { CongéeModule } from 'src/congée/congée.module';
import { Conge } from 'src/congée/entities/congée.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LeaveRequest, User, Conge]),
    UsersModule,
    CongéeModule,
  ],
  controllers: [LeaveRequestController],
  providers: [LeaveRequestService],
})
export class LeaveRequestModule {}
