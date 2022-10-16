import { Module, Global } from '@nestjs/common';
import { DbRepositoryService } from './db-repository.service';

@Global()
@Module({
  controllers: [],
  providers: [DbRepositoryService],
  exports: [DbRepositoryService],
})
export class DbRepositoryModule {}
