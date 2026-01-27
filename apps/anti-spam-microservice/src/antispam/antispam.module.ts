import { Module } from '@nestjs/common';
import { AntispamService } from './antispam.service';
import { AntispamController } from './antispam.controller';


@Module({
    controllers: [AntispamController],
    providers: [AntispamService],
})
export class AntispamModule {}