import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conge } from '../congée/entities/congée.entity';
import { User } from 'src/users/entities/user.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Conge, User])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
