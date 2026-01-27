import { Module } from '@nestjs/common';
import { AntispamModule } from './antispam/antispam.module';

@Module({
  imports: [AntispamModule],
})
export class AppModule {}
