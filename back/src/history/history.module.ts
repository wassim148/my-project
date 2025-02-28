import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conge } from '../congée/entities/congée.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conge])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
