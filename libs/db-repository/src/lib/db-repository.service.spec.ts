import { Test } from '@nestjs/testing';
import { DbRepositoryService } from './db-repository.service';

describe('DbRepositoryService', () => {
  let service: DbRepositoryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DbRepositoryService],
    }).compile();

    service = module.get(DbRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
