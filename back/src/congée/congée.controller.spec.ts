import { Test, TestingModule } from '@nestjs/testing';
import { CongéeController } from './congée.controller';
import { CongéeService } from './congée.service';

describe('CongéeController', () => {
  let controller: CongéeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CongéeController],
      providers: [CongéeService],
    }).compile();

    controller = module.get<CongéeController>(CongéeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
