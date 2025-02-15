import { Test, TestingModule } from '@nestjs/testing';
import { CongéeService } from './congée.service';

describe('CongéeService', () => {
  let service: CongéeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CongéeService],
    }).compile();

    service = module.get<CongéeService>(CongéeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
