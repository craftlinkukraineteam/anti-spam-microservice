import { Controller, Post, Body } from '@nestjs/common';
import { AntispamService } from './antispam.service';


@Controller('antispam')
export class AntispamController {
    constructor(private readonly antispamService: AntispamService) {}

    @Post('check')
    @Post('check')
    check(@Body('message') message: string) {
        return this.antispamService.checkMessage(message);
    }
}